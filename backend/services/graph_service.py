"""
Graph Service — Knowledge graph data management.
New feature for the Knowledge Graph View (Design.md §3.D)
"""

import uuid
import json
from typing import List

from backend.models.graph import GraphNode, GraphEdge, GraphResponse
from utils.dbutils import query_db


class GraphService:
    """
    Manages knowledge graph construction from research entities.
    
    Uses LLM to extract entities and relationships from ChromaDB documents,
    returning them as nodes/edges for React Flow visualization.
    """

    def __init__(self, llm, embeddings, persist_dir: str):
        self.llm = llm
        self.embeddings = embeddings
        self.persist_dir = persist_dir
        # In-memory session graphs (TODO: persist to DB)
        self._session_graphs: dict = {}

    async def get_session_graph(self, session_id: str) -> GraphResponse:
        """
        Get or create the knowledge graph for a session.
        
        If no graph exists yet, creates a seed graph from the
        most recent research context in ChromaDB.
        """
        if session_id in self._session_graphs:
            return self._session_graphs[session_id]

        # Seed graph from ChromaDB
        nodes, edges = await self._build_seed_graph()
        graph = GraphResponse(nodes=nodes, edges=edges)
        self._session_graphs[session_id] = graph
        return graph

    async def expand_node(self, node_id: str, session_id: str) -> GraphResponse:
        """
        Expand a node by discovering related concepts.
        
        1. Query ChromaDB with the node's label
        2. Use LLM to extract related entities
        3. Return new nodes and edges
        
        Source: Design.md §3.D — "Clicking a node fetches its related entities"
        """
        # Get existing graph
        graph = await self.get_session_graph(session_id)
        
        # Find the node being expanded
        target_node = None
        for node in graph.nodes:
            if node.id == node_id:
                target_node = node
                break

        if not target_node:
            return GraphResponse(nodes=[], edges=[])

        # Query DB for related content
        results = query_db(target_node.label, self.embeddings, self.persist_dir)
        context = "\n".join([r.page_content for r in results])

        # Extract entities using LLM
        prompt = f"""Given the following research context about "{target_node.label}", 
extract 3-5 related concepts, methods, or entities.

Context:
{context}

Return your answer as a JSON array of objects with "label" and "type" fields.
Types can be: "concept", "paper", "author", "method"
Example: [{{"label": "Neural Networks", "type": "concept"}}, {{"label": "Backpropagation", "type": "method"}}]

JSON:"""

        try:
            response = self.llm.invoke(prompt)
            # Parse LLM response
            entities = json.loads(response.content.strip())
        except (json.JSONDecodeError, Exception):
            # Fallback: create a single related concept
            entities = [{"label": f"Related to {target_node.label}", "type": "concept"}]

        # Create new nodes and edges
        new_nodes = []
        new_edges = []
        for entity in entities:
            new_id = str(uuid.uuid4())[:8]
            new_nodes.append(
                GraphNode(
                    id=new_id,
                    label=entity.get("label", "Unknown"),
                    type=entity.get("type", "concept"),
                )
            )
            new_edges.append(
                GraphEdge(
                    source=node_id,
                    target=new_id,
                    label="related_to",
                )
            )

        # Merge into session graph
        graph.nodes.extend(new_nodes)
        graph.edges.extend(new_edges)
        self._session_graphs[session_id] = graph

        return GraphResponse(nodes=new_nodes, edges=new_edges)

    async def _build_seed_graph(self) -> tuple:
        """Build an initial seed graph from ChromaDB content."""
        # Query for general concepts
        try:
            results = query_db("main research topics and concepts", self.embeddings, self.persist_dir)
            if not results:
                return [GraphNode(id="root", label="Research", type="concept")], []

            root = GraphNode(id="root", label="Research Hub", type="concept")
            nodes = [root]
            edges = []

            for i, doc in enumerate(results):
                # Extract a title from the document
                title = doc.page_content[:50].strip().split("\n")[0]
                node_id = f"seed-{i}"
                nodes.append(
                    GraphNode(
                        id=node_id,
                        label=title,
                        type="paper",
                        metadata={"source": doc.metadata.get("source", "")},
                    )
                )
                edges.append(GraphEdge(source="root", target=node_id, label="contains"))

            return nodes, edges
        except Exception:
            return [GraphNode(id="root", label="Research", type="concept")], []

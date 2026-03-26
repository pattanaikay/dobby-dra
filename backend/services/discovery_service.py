"""
Discovery Service — Topic randomizer for Deep Dive Discovery.
Source: Design.md §3.C
"""

import random
from typing import List

from backend.models.graph import TopicCard
from utils.dbutils import query_db


# Curated color palette for topic cards (from design system)
TOPIC_COLORS = [
    "#0453cd",  # primary
    "#356ee7",  # primary-container
    "#924628",  # tertiary
    "#515f74",  # secondary
    "#0c56d0",  # surface-tint
]


class DiscoveryService:
    """
    Generates random research topic pairs for the Deep Dive Discovery page.
    
    Picks topics from the ChromaDB document collection and wraps them
    in a visually themed TopicCard with color assignments.
    """

    def __init__(self, llm, embeddings, persist_dir: str):
        self.llm = llm
        self.embeddings = embeddings
        self.persist_dir = persist_dir

    async def get_random_topics(self, count: int = 2) -> List[TopicCard]:
        """
        Generate random distinct topics from the research collection.
        
        Returns:
            List of TopicCard objects with title, description, and color.
        """
        # Try to get topics from DB content
        try:
            seed_queries = [
                "emerging research trends",
                "breakthrough discoveries",
                "fundamental concepts",
                "cutting edge methods",
                "important theories",
            ]
            query = random.choice(seed_queries)
            results = query_db(query, self.embeddings, self.persist_dir)

            if results and len(results) >= count:
                selected = random.sample(results, count)
                topics = []
                for i, doc in enumerate(selected):
                    # Generate a topic from the document content
                    title_prompt = (
                        f"Given this research text, generate a compelling 3-5 word research topic title:\n\n"
                        f"{doc.page_content[:500]}\n\nTitle:"
                    )
                    desc_prompt = (
                        f"Given this research text, write a 1-sentence intriguing description:\n\n"
                        f"{doc.page_content[:500]}\n\nDescription:"
                    )

                    title_response = self.llm.invoke(title_prompt)
                    desc_response = self.llm.invoke(desc_prompt)

                    topics.append(
                        TopicCard(
                            title=title_response.content.strip().strip('"'),
                            description=desc_response.content.strip(),
                            color=TOPIC_COLORS[i % len(TOPIC_COLORS)],
                        )
                    )
                return topics

        except Exception:
            pass

        # Fallback: return interesting default topics
        return [
            TopicCard(
                title="Quantum Computing Frontiers",
                description="Explore the latest breakthroughs in quantum error correction and fault-tolerant computing.",
                color=TOPIC_COLORS[0],
            ),
            TopicCard(
                title="Neural Architecture Search",
                description="Discover how AI designs its own neural networks for unprecedented performance.",
                color=TOPIC_COLORS[2],
            ),
        ][:count]

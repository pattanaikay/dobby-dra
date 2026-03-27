"""
Research-focused agents for academic paper analysis and literature review.
"""

from typing import List, Dict
from langchain_ollama import ChatOllama
from langchain_core.documents import Document


class PaperAnalysisAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    def _extract_title(self, paper: Document) -> str:
        """Extract the title from the paper."""
        content = paper.page_content if isinstance(paper, Document) else paper.get("query", "")
        lines = content.strip().split("\n")
        return next((line.strip() for line in lines if line.strip()), "Untitled")

    def _extract_abstract(self, paper: Document) -> str:
        """Extract the abstract from the paper."""
        content = paper.page_content if isinstance(paper, Document) else paper.get("query", "")
        paragraphs = content.split("\n\n")
        return paragraphs[0] if paragraphs else ""

    async def analyze_paper(self, paper: Document) -> Dict:
        """Analyze a single research paper."""
        return {
            "title": self._extract_title(paper),
            "abstract": self._extract_abstract(paper),
            "key_findings": await self._extract_key_findings(paper),
            "methodology": await self._extract_methodology(paper),
            "conclusions": await self._extract_conclusions(paper)
        }

    async def _extract_key_findings(self, paper: Document) -> List[str]:
        """Extract key findings using LLM."""
        content = paper.page_content if isinstance(paper, Document) else str(paper)
        prompt = (
            "Extract the 3-5 most important key findings from this research text. "
            "Return each finding as a concise bullet point.\n\n"
            f"Text:\n{content[:3000]}\n\nKey Findings:"
        )
        try:
            response = self.llm.invoke(prompt)
            lines = [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()]
            return lines[:5] if lines else ["No key findings extracted"]
        except Exception:
            return ["Analysis pending"]

    async def _extract_methodology(self, paper: Document) -> str:
        """Extract methodology using LLM."""
        content = paper.page_content if isinstance(paper, Document) else str(paper)
        prompt = (
            "Summarize the research methodology used in this text in 2-3 sentences.\n\n"
            f"Text:\n{content[:3000]}\n\nMethodology:"
        )
        try:
            response = self.llm.invoke(prompt)
            return response.content.strip()
        except Exception:
            return "Methodology analysis pending"

    async def _extract_conclusions(self, paper: Document) -> List[str]:
        """Extract conclusions using LLM."""
        content = paper.page_content if isinstance(paper, Document) else str(paper)
        prompt = (
            "Extract the main conclusions from this research text. "
            "Return 2-4 concise conclusion points.\n\n"
            f"Text:\n{content[:3000]}\n\nConclusions:"
        )
        try:
            response = self.llm.invoke(prompt)
            lines = [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()]
            return lines[:4] if lines else ["No conclusions extracted"]
        except Exception:
            return ["Conclusion analysis pending"]


class LiteratureReviewAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    async def create_literature_review(self, papers: List[Document]) -> Dict:
        """Create a comprehensive literature review from multiple papers."""
        return {
            "overview": await self._generate_overview(papers),
            "themes": await self._identify_themes(papers),
            "gaps": await self._identify_research_gaps(papers),
            "future_work": await self._suggest_future_work(papers)
        }

    async def _generate_overview(self, papers: List[Document]) -> str:
        combined = "\n\n---\n\n".join([p.page_content[:1000] for p in papers[:5]])
        prompt = f"Write a concise overview paragraph synthesizing these research texts:\n\n{combined}\n\nOverview:"
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Literature overview pending"

    async def _identify_themes(self, papers: List[Document]) -> List[str]:
        combined = "\n\n---\n\n".join([p.page_content[:800] for p in papers[:5]])
        prompt = f"Identify 3-5 common themes across these research texts:\n\n{combined}\n\nThemes:"
        try:
            response = self.llm.invoke(prompt)
            return [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()][:5]
        except Exception:
            return ["Theme analysis pending"]

    async def _identify_research_gaps(self, papers: List[Document]) -> List[str]:
        combined = "\n\n---\n\n".join([p.page_content[:800] for p in papers[:5]])
        prompt = f"Identify 2-3 research gaps based on these texts:\n\n{combined}\n\nGaps:"
        try:
            response = self.llm.invoke(prompt)
            return [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()][:3]
        except Exception:
            return ["Gap analysis pending"]

    async def _suggest_future_work(self, papers: List[Document]) -> List[str]:
        combined = "\n\n---\n\n".join([p.page_content[:800] for p in papers[:5]])
        prompt = f"Suggest 2-3 future research directions based on these texts:\n\n{combined}\n\nFuture Work:"
        try:
            response = self.llm.invoke(prompt)
            return [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()][:3]
        except Exception:
            return ["Future work suggestions pending"]


class CitationAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    def format_citation(self, paper: Document, style: str = "APA") -> str:
        """Format a citation in the specified style."""
        content = paper.page_content[:500] if isinstance(paper, Document) else str(paper)[:500]
        prompt = f"Generate an {style} citation for this text:\n\n{content}\n\nCitation:"
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Citation generation pending"

    def generate_bibliography(self, papers: List[Document], style: str = "APA") -> str:
        """Generate a bibliography from a list of papers."""
        citations = [self.format_citation(p, style) for p in papers]
        return "\n\n".join(citations)
"""
Writing-focused agents for creating reports and documentation.
"""

from typing import List, Dict
from langchain_ollama import ChatOllama
from langchain_core.documents import Document


class ReportWritingAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    async def create_report(self, research_data: Dict, template: str = "academic") -> str:
        """Create a structured research report."""
        return await self._generate_report(research_data, template)

    async def _generate_report(self, research_data: Dict, template: str) -> str:
        """Generate a structured report from research data."""
        data_str = "\n".join([f"- {k}: {v}" for k, v in research_data.items() if isinstance(v, str)])
        prompt = (
            f"Create a structured {template} research report based on this data:\n\n"
            f"{data_str}\n\n"
            "Include: Title, Abstract, Introduction, Key Findings, Discussion, Conclusion.\n"
            "Report:"
        )
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Report generation pending"

    async def create_summary(self, content: str, length: str = "medium") -> str:
        """Create an executive summary of the content."""
        length_guide = {"short": "2-3 sentences", "medium": "1 paragraph", "long": "2-3 paragraphs"}
        target = length_guide.get(length, "1 paragraph")
        prompt = (
            f"Write an executive summary ({target}) of this content:\n\n"
            f"{content[:3000]}\n\nSummary:"
        )
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Summary generation pending"


class TechnicalWritingAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    async def create_technical_doc(self, content: Dict, doc_type: str) -> str:
        """Create technical documentation."""
        data_str = "\n".join([f"- {k}: {v}" for k, v in content.items() if isinstance(v, str)])
        prompt = (
            f"Create a {doc_type} technical document based on:\n\n{data_str}\n\n"
            "Include clear sections, code examples where relevant, and best practices.\n"
            "Document:"
        )
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Technical document generation pending"

    async def create_api_docs(self, code: str) -> str:
        """Create API documentation from code."""
        prompt = (
            "Generate comprehensive API documentation for this code. "
            "Include endpoints, parameters, return types, and examples.\n\n"
            f"```\n{code[:3000]}\n```\n\nAPI Documentation:"
        )
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "API documentation generation pending"


class SummaryAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    async def summarize_paper(self, paper: Document) -> Dict:
        """Create a detailed summary of a research paper."""
        return {
            "brief": await self._create_brief_summary(paper),
            "detailed": await self._create_detailed_summary(paper),
            "key_points": await self._extract_key_points(paper)
        }

    async def _create_brief_summary(self, paper: Document) -> str:
        content = paper.page_content if isinstance(paper, Document) else str(paper)
        prompt = f"Write a 2-3 sentence summary of this text:\n\n{content[:2000]}\n\nBrief Summary:"
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Brief summary pending"

    async def _create_detailed_summary(self, paper: Document) -> str:
        content = paper.page_content if isinstance(paper, Document) else str(paper)
        prompt = (
            "Write a detailed summary (2-3 paragraphs) of this research text. "
            "Cover the main arguments, evidence, and conclusions.\n\n"
            f"{content[:3000]}\n\nDetailed Summary:"
        )
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Detailed summary pending"

    async def _extract_key_points(self, paper: Document) -> List[str]:
        content = paper.page_content if isinstance(paper, Document) else str(paper)
        prompt = f"Extract 3-5 key points from this text:\n\n{content[:2000]}\n\nKey Points:"
        try:
            response = self.llm.invoke(prompt)
            return [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()][:5]
        except Exception:
            return ["Key points extraction pending"]
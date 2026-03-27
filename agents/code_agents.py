"""
Code-focused agents for generation, review, and documentation.
"""

from typing import List, Dict, Optional
from langchain_ollama import ChatOllama
from pathlib import Path


class CodeGenerationAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    async def generate_code(self, requirements: str, context: Optional[Dict] = None) -> str:
        """Generate code based on requirements and context."""
        ctx = ""
        if context:
            ctx = f"\nExisting code context:\n{context.get('code', '')}\n"
        prompt = (
            "You are a coding assistant. Generate clean, well-documented code.\n"
            f"{ctx}\n"
            f"Requirements: {requirements}\n\n"
            "Provide the complete code with comments:"
        )
        try:
            response = self.llm.invoke(prompt)
            return response.content.strip()
        except Exception as e:
            return f"# Code generation error: {e}"

    async def modify_code(self, code: str, modifications: str) -> str:
        """Modify existing code based on requirements."""
        prompt = (
            "You are a coding assistant. Modify the following code as requested.\n\n"
            f"Original code:\n```\n{code[:3000]}\n```\n\n"
            f"Required modifications: {modifications}\n\n"
            "Provide the modified code ONLY:"
        )
        try:
            response = self.llm.invoke(prompt)
            return response.content.strip()
        except Exception as e:
            return f"# Code modification error: {e}"


class CodeReviewAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    async def review_code(self, code: str) -> Dict:
        """Review code and provide feedback."""
        return {
            "quality_score": await self._assess_code_quality(code),
            "issues": await self._identify_issues(code),
            "suggestions": await self._make_suggestions(code),
            "security_concerns": await self._check_security(code)
        }

    async def _assess_code_quality(self, code: str) -> float:
        """Assess code quality on a 0-10 scale."""
        prompt = (
            "Rate this code on a scale of 0-10 for quality (readability, structure, "
            "best practices). Return ONLY a number.\n\n"
            f"```\n{code[:2000]}\n```\n\nScore:"
        )
        try:
            response = self.llm.invoke(prompt)
            score = float(response.content.strip().split()[0])
            return min(max(score, 0), 10)
        except Exception:
            return 5.0

    async def _identify_issues(self, code: str) -> List[str]:
        """Identify code issues."""
        prompt = (
            "Identify 3-5 issues or bugs in this code. "
            "Return each issue as a concise bullet point.\n\n"
            f"```\n{code[:2000]}\n```\n\nIssues:"
        )
        try:
            response = self.llm.invoke(prompt)
            return [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()][:5]
        except Exception:
            return ["Code review pending"]

    async def _make_suggestions(self, code: str) -> List[str]:
        """Make improvement suggestions."""
        prompt = (
            "Suggest 2-4 improvements for this code.\n\n"
            f"```\n{code[:2000]}\n```\n\nSuggestions:"
        )
        try:
            response = self.llm.invoke(prompt)
            return [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()][:4]
        except Exception:
            return ["Suggestions pending"]

    async def _check_security(self, code: str) -> List[str]:
        """Check for security vulnerabilities."""
        prompt = (
            "Identify any security concerns in this code. "
            "Return each concern as a concise bullet point. "
            "If none found, say 'No security concerns identified.'\n\n"
            f"```\n{code[:2000]}\n```\n\nSecurity:"
        )
        try:
            response = self.llm.invoke(prompt)
            return [l.strip().lstrip("-•*").strip() for l in response.content.strip().split("\n") if l.strip()][:4]
        except Exception:
            return ["Security review pending"]


class DocumentationAgent:
    def __init__(self, llm: ChatOllama):
        self.llm = llm

    async def generate_docs(self, code: str, style: str = "Google") -> str:
        """Generate documentation for code."""
        prompt = (
            f"Generate {style}-style documentation for this code. "
            "Include docstrings, parameter descriptions, and return types.\n\n"
            f"```\n{code[:3000]}\n```\n\nDocumentation:"
        )
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "Documentation generation pending"

    async def generate_readme(self, project_path: Path) -> str:
        """Generate a README file for a project."""
        prompt = (
            f"Generate a professional README.md for a project at: {project_path}\n"
            "Include: Overview, Installation, Usage, API Reference, Contributing sections."
        )
        try:
            return self.llm.invoke(prompt).content.strip()
        except Exception:
            return "README generation pending"
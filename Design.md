# Synthetica Research: Implementation Roadmap & Design System (Updated)

## 1. Technical Stack Recommendations
To achieve the level of interactivity, performance, and minimalist aesthetic shown in the designs, I recommend the following stack:

*   **Framework:** **Next.js (App Router)** - Best-in-class for React SEO, routing, and performance. Its Server Components are perfect for handling heavy research data fetching.
*   **Styling:** **Tailwind CSS** - Essential for the utility-first approach needed for these custom, minimalist layouts.
*   **Animations & Graphs:** **Framer Motion** for UI transitions. For the Knowledge Graph, use **React Flow** or **D3.js** to handle complex node/edge interactions and layouts efficiently.
*   **Icons:** **Lucide React** or **Google Material Symbols** - For clean, consistent iconography.
*   **State Management:** **TanStack Query (React Query)** - Ideal for managing the research agent's asynchronous states (loading, streaming, etc.).
*   **Components:** **Shadcn UI** - A great foundation built on Tailwind that you can customize to match the "Synthetica" design language.

---

## 2. Design System: "The Intellectual Canvas"

### Visual Philosophy
*   **Minimalist High-Contrast:** Focus on white space and crisp typography.
*   **Materiality:** Use glassmorphism (`backdrop-blur`) and subtle borders (`border-slate-100/10`) to create depth without clutter.
*   **Brand Color:** Teal (#0D9488) used sparingly for primary actions and "active" states.

### Typography (Manrope)
*   **Headers:** `font-extrabold tracking-tighter` (e.g., "Choose Your Intellectual Frontier").
*   **Body:** `font-medium text-slate-500` for meta-text; `text-slate-900` for primary content.

---

## 3. Screen-by-Screen Implementation Guide

### A. Deep Research Chat (The "Zen" Workspace)
*   **Key Feature:** Streaming responses. 
*   **Implementation Note:** Use a `ReadableStream` from your backend. Use Framer Motion's `AnimatePresence` for the "Live Context" sidebar to slide in smoothly.

### B. Research Library (The Digital Curator)
*   **Layout:** A CSS Grid layout for the project cards.
*   **Logic:** Implement a simple filter for "Recently Saved Documents" using local state or URL params.

### C. Deep Dive Discovery (The Spark)
*   **Logic:** A simple "Randomizer" function on the backend that picks two distinct topics.
*   **Interaction:** Clicking "Dive In" should trigger a page transition that carries the theme (color/image) into the new research session.

### D. Knowledge Graph View (The Web of Wisdom)
*   **Key Feature:** Interactive node/edge mapping.
*   **Implementation Note:** Use **React Flow** for the canvas component. Nodes should be custom-styled components. Edges should be dynamically calculated.
*   **Logic:** Each node represents a concept. Clicking a node fetches its "related entities" from your backend (e.g., LangChain's Entity extraction) and adds them as new nodes to the state.
*   **Controls:** Implement a floating toolbar for graph manipulation (Fit to View, Zoom, Undo/Redo).

---

## 4. Backend Integration Strategy
Since you have your backend in Streamlit, you likely have Python/LangChain/OpenAI logic ready.
1.  **API Layer:** Wrap your Streamlit logic into a FastAPI or Flask app.
2.  **Websockets/SSE:** For the "Deep Research" feel, use Server-Sent Events (SSE) to stream the agent's thought process to the Next.js frontend.
3.  **Graph API:** Create an endpoint specifically for the Knowledge Graph that returns nodes and edges in JSON format (e.g., `{ nodes: [], edges: [] }`).
4.  **File Handling:** Use a service like AWS S3 or Supabase Storage for the "Upload" feature.
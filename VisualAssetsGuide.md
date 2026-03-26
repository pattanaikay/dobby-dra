# Visual Assets & Imagery Guide: The Intellectual Canvas (.md)

To replicate the high-fidelity, "Curated" look of your research agent, you'll need a strategy for sourcing and styling visuals dynamically.

## 1. Sourcing Your Images

### A. Professional Stock APIs (Unsplash/Pexels)
For a "Library" or "History" feel, use high-quality photography.
*   **Source:** [Unsplash API](https://unsplash.com/developers)
*   **Pricing:** 
    *   **Free Tier:** Generous free tier (50 req/hr) for development.
    *   **Paid:** If you scale to a large number of users, you'll need to contact them for a production license, which is usually not free for high volume.
*   **Search Strategy:** Use conceptual keywords: "vintage map," "old compass," "ocean parchment."

### B. AI Image Generation (Imagen / Stable Diffusion)
For abstract concepts like "Quantum Biology," AI generation is best.
*   **Source:** [Imagen via Vertex AI (Google Cloud)](https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview)
*   **Pricing:**
    *   **Paid:** Vertex AI follows a "pay-as-you-go" model. There is usually a free trial period for new Google Cloud accounts (e.g., $300 credit), but it is not a "free forever" service for high usage.
*   **Prompting Strategy:** "Macro photography," "Minimalist 3D render," "Dark aesthetic," "Teal accents."

---

## 2. Technical Implementation (The "Curator" Style)

Wrap your images in a container with an overlay to ensure text legibility.

### A. The Dark Overlay (Tailwind CSS)
```html
<div class="relative overflow-hidden rounded-xl">
  <!-- The Background Image -->
  <img src="..." class="h-64 w-full object-cover" />
  
  <!-- The Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
  
  <!-- The Content -->
  <div class="absolute bottom-0 p-6">
    <h3 class="text-white font-bold">Quantum Entanglement</h3>
  </div>
</div>
```

### B. Glassmorphism Accents
```html
<div class="backdrop-blur-md bg-white/10 border border-white/20 p-2 rounded-lg">
  <span class="text-xs text-white">8 min read</span>
</div>
```

---

## 3. Reference Image Assets (Direct URLs)
*   **Quantum Entanglement:** `https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000`
*   **Ancient Maritime Routes:** `https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000`
*   **Photosynthetic Coherence:** `https://images.unsplash.com/photo-1501166617713-a1b9d0e72f98?q=80&w=2000`
*   **Non-Euclidean Lattices:** `https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000`
*   **Stoic Epistemology:** `https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000`
# Ad Skin

> _What happens when the most celebrated image of human dignity becomes an ad surface?_

Ad Skin maps 108 manipulative advertisement phrases as literal texture onto Michelangelo's David head, rendered in a browser as a rotating 3D object. The ads scroll across his face. You can click them. They go somewhere.

An embedded chatbot voiced as David himself, sardonic and well-read, fields questions about the work using a RAG pipeline grounded in 108 critical theory texts. The library and the ad count are not a coincidence.

---

## Why This Exists

David was carved in 1504 as the embodiment of Renaissance humanism. The ideal man. Vigilant, proportioned, free. He now lives in a browser tab covered in corporate language telling you to optimize, belong, and convert.

The counter-rotation is intentional. The model turns one way; the advertisement layer turns the other. They are never aligned. The human form and the commercial language covering it exist in permanent, irresolvable tension.

The 108 books linked through the ads are all freely available. Clicking an ad opens one. The work is partly an argument that the tools to understand what is happening to us have existed for decades, written by people who saw it coming, and that this has not meaningfully slowed anything down.

---

## Features

### 3D Scene

- Michelangelo's David head model (24,011 vertices, fully UV-mapped)
- WebGL rendering via Three.js with portrait lighting setup
- Counter-rotating animation: model and ad texture move in opposite directions
- Orbit controls for interactive exploration
- Raycaster-based click detection on individual advertisement banners
- Each banner links to a freely available critical theory text
- Animated damask background

### Canvas Texture System

- 3000 x 2300px procedurally generated canvas texture mapped onto the 3D model
- 108 advertisement phrases drawn as 300 x 50px banners across the UV surface
- UV analyzer maps the model's surface topology to position ads accurately
- Eye-region protection: ads are excluded from the face's focal areas
- Real-time canvas animation synced to the Three.js render loop

### The Chatbot

David answers questions. He has been rotating in a browser long enough to develop opinions.

His responses are grounded in a curated library of 108 critical theory texts via a retrieval-augmented generation pipeline. He finds it darkly funny how precisely Baudrillard, Debord, Foucault, and Marcuse predicted the exact shape of contemporary platform capitalism, and he enjoys pointing this out. He will explain any concept he introduces. He does not use em dashes.

The pipeline streams responses token by token. A concurrency queue limits simultaneous requests to prevent hammering the upstream API.

---

## Tech Stack

| Layer             | Technology                                         |
| ----------------- | -------------------------------------------------- |
| Framework         | Next.js 16 (App Router) + React 19                 |
| Language          | TypeScript                                         |
| Styling           | Tailwind CSS v4                                    |
| 3D Rendering      | Three.js + WebGL                                   |
| LLM               | Groq API (`llama-3.3-70b-versatile`)               |
| LLM Orchestration | LangChain (`@langchain/openai`, `@langchain/core`) |
| Package Manager   | pnpm                                               |

<details><summary>Project Structure</summary>

```
├── app/
│   ├── api/chat/route.ts        # Streaming RAG API endpoint
│   ├── page.tsx                 # Root page
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── three/
│   │   ├── SceneContainer.tsx   # Three.js canvas mount and lifecycle
│   │   └── SphereScene.tsx      # Scene orchestration
│   ├── chat/
│   │   ├── Chatbot.tsx          # Chat state and streaming fetch logic
│   │   ├── ChatWindow.tsx       # Chat panel layout
│   │   ├── ChatHeader.tsx       # Expand/collapse controls
│   │   ├── ChatMessages.tsx     # Message list
│   │   ├── ChatMessage.tsx      # Individual message bubble
│   │   ├── ChatInput.tsx        # Text input and send button
│   │   ├── ChatToggleButton.tsx # Floating open/close button
│   │   ├── SuggestedQuestions.tsx
│   │   ├── LoadingIndicator.tsx
│   │   └── types.ts
│   ├── icons/                   # Shared SVG icon components (barrel export)
│   └── layout/
│       └── LiquidBackground.tsx # Animated damask canvas background
│
├── hooks/three/
│   ├── useThreeScene.ts         # Scene, camera, renderer setup
│   ├── useControls.ts           # Orbit controls
│   ├── canvas/
│   │   ├── useCanvasTexture.ts  # Canvas -> Three.js texture pipeline
│   │   ├── useCanvasAnimation.ts
│   │   ├── useAdPositionCalculator.ts
│   │   ├── useAdUrlManager.ts   # Maps each ad to a source text URL
│   │   └── use3DMouseRaycaster.ts
│   ├── geometry/
│   │   ├── useHeadModel.ts      # GLTF model loader
│   │   └── useGeometry.ts
│   └── lighting/
│       ├── useLighting.ts
│       └── usePortraitLighting.ts
│
├── lib/
│   ├── rag/
│   │   ├── config.ts            # RAG tuning parameters (env-overridable)
│   │   ├── retriever.ts         # Term-overlap document ranking
│   │   ├── augmenter.ts         # Context packing and history formatting
│   │   └── pipeline.ts          # Assemble retrieve -> augment -> generate
│   ├── sources.ts               # 108 critical theory texts (authors, titles, URLs)
│   ├── queue.ts                 # Concurrency limiter (10 active / 50 queued)
│   └── errors.ts                # Error classifiers (isQueueFull)
│
├── utils/
│   ├── adContent.ts             # 108 ad phrases, colors, and source URLs (shuffled)
│   ├── canvas/
│   │   ├── drawing/
│   │   │   ├── drawAdBanner.ts  # Individual banner renderer
│   │   │   └── drawGridPattern.ts
│   │   └── uv-mapping/
│   │       ├── uvAnalyzer.ts    # UV coordinate analysis
│   │       └── headSurfaceMapper.ts
│   └── chat/
│       ├── decisionTree.ts      # Two-phase message routing
│       ├── tier0Responses.ts    # Pre-populated concept responses
│       └── suggestedQuestions.ts
│
└── public/
    ├── models/scene.gltf        # David head model
    └── images/damask.png
```

</details>

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Add environment variables
cp .env.example .env.local
# Set GROQ_API_KEY in .env.local

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable                | Description                         | Default                          |
| ----------------------- | ----------------------------------- | -------------------------------- |
| `GROQ_API_KEY`          | Groq API key (required for chat)    | —                                |
| `GROQ_MODEL`            | Model name                          | `llama-3.3-70b-versatile`        |
| `GROQ_BASE_URL`         | API base URL                        | `https://api.groq.com/openai/v1` |
| `RAG_TOP_K`             | Max documents retrieved per query   | `3`                              |
| `RAG_MIN_SCORE`         | Minimum relevance score (0–1)       | `0.05`                           |
| `RAG_MAX_CONTEXT_CHARS` | Context budget in characters        | `6000`                           |
| `RAG_MAX_HISTORY_TURNS` | Prior conversation turns to include | `6`                              |

---

## RAG Pipeline

The chatbot is backed by a full retrieval-augmented generation pipeline built in `lib/rag/` and exposed through `app/api/chat/route.ts`. Every user message flows through three sequential stages before a word is streamed back.

```
User message
     |
     v
+---------------------------------------------------------+
|  app/api/chat/route.ts                                  |
|  Validates and normalises message array                 |
|  Extracts query (last message)                          |
|  Gates request through lib/queue.ts                     |
|  Streams text/plain response token-by-token             |
+--------------------+------------------------------------+
                     | withQueue(() => runPipeline(...))
                     v
+---------------------------------------------------------+
|  lib/rag/pipeline.ts  runPipeline()                     |
|                                                         |
|  Stage 1: retrieve(query, { topK, minScore })           |
|       +-> lib/rag/retriever.ts                          |
|                                                         |
|  Stage 2: augment(docs, maxContextChars)                |
|           formatHistory(messages, maxHistoryTurns)      |
|       +-> lib/rag/augmenter.ts                          |
|                                                         |
|  Stage 3: chain.stream({ context, history, question })  |
|       +-> Groq API via LangChain ChatOpenAI             |
+---------------------------------------------------------+
```

### Stage 1 — Retrieval (`lib/rag/retriever.ts`)

At module load, every entry in `lib/sources.ts` (108 books across 40+ authors) is materialised into a flat array of LangChain `Document` objects. Each document's `pageContent` contains the author name, title, year, topic, and full description.

When a query arrives, every document is scored using a term-overlap heuristic:

```
score = (query terms found in document) / (total query terms)
```

Terms shorter than four characters are excluded to suppress stopword noise. Documents scoring below `RAG_MIN_SCORE` are discarded; the remainder are sorted descending and capped at `RAG_TOP_K`. Because the library is static and built at startup, retrieval is a pure in-memory operation with no database or embedding service.

| Variable        | Role                                                            | Default |
| --------------- | --------------------------------------------------------------- | ------- |
| `RAG_TOP_K`     | Maximum number of documents returned per query                  | `3`     |
| `RAG_MIN_SCORE` | Minimum term-overlap score a document must reach to be included | `0.05`  |

### Stage 2 — Augmentation (`lib/rag/augmenter.ts`)

`augment()` iterates the retrieved documents in ranked order and packs them into a single context string, stopping when the next document would exceed the character budget. If the last document partially fits and at least 300 characters remain, it is included truncated with a `[...truncated]` marker. Each document is labelled with its author and title so the model can attribute its reasoning.

`formatHistory()` takes the full message array, drops the current query (passed separately as `{question}`), and serialises the most recent N turn-pairs as a plaintext transcript.

| Variable                | Role                                                                                                                              | Default |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `RAG_MAX_CONTEXT_CHARS` | Character budget for the assembled context block. Larger values give the model more source material at the cost of prompt tokens. | `6000`  |
| `RAG_MAX_HISTORY_TURNS` | Number of prior user/assistant exchange pairs to include. Higher values improve coherence in long conversations.                  | `6`     |

### Stage 3 — Generation (`lib/rag/pipeline.ts`)

A LangChain `RunnableSequence` chains the prompt template, Groq LLM, and string output parser. The model is instantiated once as a module-level singleton and reused across requests. The prompt persona is David himself: a 500-year-old marble head with a library and a sense of humor, instructed to ground every response in the retrieved texts and explain any theoretical concept he introduces.

The pipeline returns an `AsyncIterable<string>` which the route handler forwards directly to a `ReadableStream`, encoding each chunk as UTF-8 bytes as they arrive. The client reads this stream incrementally, appending each chunk to the in-progress assistant message in real time.

| Variable        | Role                                                                                                        | Default                          |
| --------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `GROQ_API_KEY`  | API key for the Groq inference endpoint. Required.                                                          | —                                |
| `GROQ_MODEL`    | Model identifier. Any OpenAI-compatible model name works.                                                   | `llama-3.3-70b-versatile`        |
| `GROQ_BASE_URL` | Base URL. Can be swapped for OpenAI, Mistral, or a local Ollama instance without changing application code. | `https://api.groq.com/openai/v1` |

### Request Queue (`lib/queue.ts`)

All pipeline calls are wrapped in `withQueue()` before execution. The queue allows a maximum of 10 concurrent in-flight requests; additional requests wait in a backlog capped at 50. Any request that arrives when the backlog is full is rejected immediately with a `QUEUE_FULL` error, which the route handler converts to a `429` response.

---

## The 108

The number is deliberate. There are 108 advertisement phrases on the model and 108 books in the library. Each ad banner links to a freely available PDF or web version of one of the texts. Clicking an ad does not take you to a product. It takes you to Foucault, or Marcuse, or Debord, or Orwell, or Zuboff.

The full library spans Baudrillard, Debord, Foucault, Marcuse, Gramsci, Adorno, Benjamin, McLuhan, Marx, Byung-Chul Han, Mark Fisher, Naomi Klein, Shoshana Zuboff, Chomsky, Postman, Zizek, Hegel, Nietzsche, Dostoevsky, Huxley, Plato, and more. Most of the texts are decades old. All of them remain current.

---

## Canvas Texture Details

- Canvas dimensions: 3000 x 2300px
- Ad banner size: 300 x 50px
- 108 advertisement phrases drawn from surveillance capitalism, corporate jargon, self-improvement, and pharmaceutical language patterns
- UV mapping derived directly from the model's vertex data to ensure accurate surface placement
- Eye-region coordinates are excluded from ad placement to preserve focal recognition

---

## Credits

- David head model by [1d_inc](https://sketchfab.com/1d_inc)

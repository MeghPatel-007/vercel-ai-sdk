# vercel-ai-sdk

Learning project for the [Vercel AI SDK](https://ai-sdk.dev) (TypeScript), with [Groq](https://groq.com) and [OpenRouter](https://openrouter.ai) as model providers. Each file covers one concept.

## What this covers

| File | Concept |
| --- | --- |
| `env.ts` | Validating environment variables with Zod |
| `generatingText.ts` | `generateText` — basic one-shot completion |
| `streamText.ts` | `streamText` — streaming responses to stdout |
| `systemPrompt.ts` | Setting a system prompt with messages |
| `preservingChatHistory.ts` | Building a conversation with model messages |
| `dynamicModels.ts` | Swapping providers (Groq / OpenRouter) at runtime |
| `server.ts` | Hono API server exposing a `/api/get-completions` endpoint |
| `passingImgTollm.ts` | Passing images (URL or file) to a multimodal model |
| `structuredOutputs.ts` | Structured object output with Zod schema |
| `streamStructuredOutputs.ts` | Streaming structured object output |
| `commentClassifier.ts` | Classification with `Output.choice` (positive / neutral / negative) |
| `runningLocalModels.ts` | Running local models via `createOpenAICompatible` (LM Studio) |
| `toolCalling.ts` | Tool calling with `generateText` |
| `agenticFeedbackLoop.ts` | Agent loop with tools + `streamText` + `isStepCount` |
| `structuredOutputsFromPdfs.ts` | Extracting structured data from a PDF |
| `embeddingsAndVectorDbs.ts` | Embeddings + vector search with `embed` / `embedMany` / `cosineSimilarity` |

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create a `.env` with these variables:

```
GROQ_API_KEY=
GROQ_MODEL=
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
OPENROUTER_EMBEDDING_MODEL=
```

3. Export the variables before running:

```bash
source .env
```

## Run a file

```bash
bunx tsx generatingText.ts
```

Replace `generatingText.ts` with any example file above.

The server example starts on port `3000` at `0.0.0.0` and self-tests by calling `POST /api/get-completions` with a sample message.

## Tools

- **Bun** — package manager / runtime
- **tsx** — TypeScript runner
- **Zod** — schema validation (env + structured outputs)
- **Hono** — HTTP server
- **ai** — Vercel AI SDK
- **@ai-sdk/groq** — Groq provider
- **@openrouter/ai-sdk-provider** — OpenRouter provider
- **@ai-sdk/openai-compatible** — OpenAI-compatible provider (local models)

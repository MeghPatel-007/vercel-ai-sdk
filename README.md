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

## Setup

1. Install dependencies:

```bash
bun install
```

2. Copy the example env file and fill in your keys:

```bash
cp .env.example .env
```

3. Export the variables before running (the `.env` file uses `export` lines):

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
- **tsx** — TypeScript runner for Node
- **Zod** — env validation
- **Hono** — HTTP server

import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { once } from 'node:events'
import { groq } from '@ai-sdk/groq'
import { generateText, ModelMessage } from 'ai'
import { env } from './env'

const model = groq(env.GROQ_MODEL)

export const startServer = async () => {
  const app = new Hono()
  app.post('/api/get-completions', async (ctx) => {
    const messages: ModelMessage[] = await ctx.req.json()
    const result = await generateText({
      model,
      messages,
    })
    return ctx.json(result.finalStep.response.messages)
  })
  const server = serve({
    fetch: app.fetch,
    port: 3000,
    hostname: '0.0.0.0',
  })
  await once(server, 'listening')
  return server
}

const messagesToSend: ModelMessage[] = [
  {
    role: 'user',
    content: 'Hello,you!',
  },
]

const main = async () => {
  await startServer()
  const response = await fetch('http://localhost:3000/api/get-completions', {
    method: 'POST',
    body: JSON.stringify(messagesToSend),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const newMessages = (await response.json()) as ModelMessage[]
  const allMessages = [...messagesToSend, ...newMessages]
  console.dir(allMessages, { depth: null })
}
main()

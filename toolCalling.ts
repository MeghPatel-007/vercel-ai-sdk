import { groq } from '@ai-sdk/groq'
import { generateText, tool } from 'ai'
import { env } from './env'
import z from 'zod'

const model = groq(env.GROQ_MODEL)
const sysPrompt =
  `Your only role in life is to log` +
  `messages to the console.` +
  `Use the tool provided to log the` +
  `prompt to the console.`

const logToConsoleTool = tool({
  description: 'Log a message to the console',
  inputSchema: z.object({
    message: z.string().describe('The message to log to the console'),
  }),
  execute: async ({ message }) => {
    console.log(message)
  },
})

const logToConsole = async (prompt: string) => {
  const { steps } = await generateText({
    model,
    prompt,
    system: sysPrompt,
    tools: { logToConsole: logToConsoleTool },
  })
  console.dir(steps[0]?.toolCalls, { depth: null })
  console.dir(steps[0]?.toolResults, { depth: null })
}
logToConsole('hello world')

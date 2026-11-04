import { groq } from '@ai-sdk/groq'
import { streamText } from 'ai'
import { env } from './env'

const model = groq(env.GROQ_MODEL)

export const answerMyQuestion = async (prompt: string) => {
  const { textStream } = await streamText({
    model: model,
    prompt: prompt,
  })
  for await (const text of textStream) {
    process.stdout.write(text)
  }
  return textStream
}

const main = async () => {
  await answerMyQuestion('What is the weather in India?')
}
main().catch(console.error)

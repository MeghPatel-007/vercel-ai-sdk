import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { env } from './env'

const model = groq(env.GROQ_MODEL)

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model: model,
    prompt: prompt,
  })
  return text
}

const main = async () => {
  const answer = await answerMyQuestion('What is the weather in India?')
  console.log(answer)
}
main().catch(console.error)

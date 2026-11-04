import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { env } from './env'

const model = groq(env.GROQ_MODEL)
const sysPrompt = `You are a helpful, accurate AI assistant. Answer directly and concisely. Prioritize correctness over agreement. Never fabricate facts or capabilities; acknowledge uncertainty when unsure. Challenge incorrect assumptions. For technical questions, provide clean, practical code and explain critical details. Use examples when useful. Avoid repetition and unnecessary explanations. Follow the user's instructions and format.`

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    messages: [
      { role: 'system', content: sysPrompt },
      { role: 'user', content: prompt },
    ],
  })
  return text
}

const main = async () => {
  const answer = await answerMyQuestion('What is the weather in India?')
  console.log(answer)
}
main().catch(console.error)

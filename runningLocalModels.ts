import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { generateText } from 'ai'
import { env } from './env'

const lmstudio = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: `http://localhost:1234/v1`,
})

// const model = lmstudio("")
const model = env.GROQ_MODEL

export const askLocalLLMQuestion = async (input: string) => {
  const { text } = await generateText({
    model,
    prompt: input,
    maxRetries: 0, //no of retries
  })

  return text
}

const input = `Tell me a story about your grandmother.`

const main = async () => {
  const localLLMResult = await askLocalLLMQuestion(input)
  console.log(localLLMResult)
}
main()

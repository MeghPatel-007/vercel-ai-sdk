import { groq } from '@ai-sdk/groq'
import { openrouter } from '@openrouter/ai-sdk-provider';
import { generateText, LanguageModel } from 'ai'
import { env } from './env'

const groqModel = groq(env.GROQ_MODEL)

const openrouterModel = openrouter(env.OPENROUTER_MODEL)

export const ask = async (prompt: string, model: LanguageModel) => {
  const { text } = await generateText({
    model: model,
    prompt: prompt,
  })
  return text
}

const main = async () => {
  const groqAnswer = await ask('What is the weather in India?', groqModel)
  const openrouterAnswer = await ask(
    'What is the weather in India?',
    openrouterModel,
  )
  console.log(groqAnswer)
  console.log(
    '==========================================================================',
  )
  console.log(openrouterAnswer)
}
main().catch(console.error)

import { groq } from '@ai-sdk/groq'
import { generateText, Output } from 'ai'
import { env } from './env'
import z from 'zod'

const model = groq(env.GROQ_MODEL)

const schema = z.object({
  recipe: z.object({
    name: z.string().describe('The title of the recipe'),
    ingredients: z.array(
      z
        .object({
          name: z.string(),
          amount: z.string(),
        })
        .describe('The ingredient needed for the recipe'),
    ),
    steps: z.array(z.string()).describe('The steps to make the recipe'),
  }),
})

export const classifierSentiment = async (prompt: string) => {
  const { output } = await generateText({
    model: model,
    output: Output.choice({
      options: ['positive', 'neutral', 'negative'],
    }),
    system:
      `Classify the sentiment of the text as either` +
      `positive, negative, or neutral.`,
    prompt: prompt,
  })
  return output
}

const main = async () => {
  //   const answer = await classifierSentiment(`I'm not sure how I feel`) // neutral
  const answer = await classifierSentiment(`This is terrible.`) // negative
  console.log(answer)
}
main().catch(console.error)

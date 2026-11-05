// ! can't get the streaming effect of object text
import { groq } from '@ai-sdk/groq'
import { z } from 'zod'
import { env } from './env'
import { Output, streamText } from 'ai'

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

export const createRecipe = async (prompt: string) => {
  const { output, partialOutputStream } = streamText({
    model,
    output: Output.object({
      name: 'Recipe',
      description: 'A recipe for a dish.',
      schema,
    }),
    prompt,
    system:
      'You are helping a user create a recipe.' +
      'Use British English variants of ingredient names' +
      'like Coriander over Cilantro.',
  })
  for await (const partialObject of partialOutputStream) {
    console.clear()
    console.dir(partialObject, { depth: null })
  }
  return output
}

const main = async () => {
  await createRecipe('how to make baba ganoush ?')
}
main()

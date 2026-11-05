import { groq } from '@ai-sdk/groq'
import { z } from 'zod'
import { env } from './env'
import { generateObject, generateText, Output } from 'ai'

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
  const { output } = await generateText({
    model,
    output: Output.object({ schema }),
    prompt,
    system:
      'You are helping a user create a recipe.' +
      'Use British English variants of ingredient names' +
      'like Coriander over Cilantro.',
  })
  return output.recipe
}

const main = async () => {
  const recipe = await createRecipe('how to make baba ganoush ?')
  console.log(recipe)
}
main()

import { isStepCount, streamText, tool } from 'ai'
import { env } from './env'
import z from 'zod'
import { openrouter } from '@openrouter/ai-sdk-provider'

const model = openrouter(env.OPENROUTER_MODEL)

const getWeatherTool = tool({
  description: 'Get the current weather of a specific city',
  inputSchema: z.object({
    city: z.string().describe('The city to get weather for'),
  }),
  execute: async ({ city }) => {
    console.log(`The weather in ${city} is 25C and sunny.`)
    return {
      city,
      temperature: 25,
      condition: 'Sunny',
    }
  },
})

const askQuestion = async (prompt: string) => {
  const { textStream, steps } = streamText({
    model,
    prompt,
    tools: { getWeather: getWeatherTool },
    stopWhen: isStepCount(2),
  })
  for await (const text of textStream) {
    process.stdout.write(text)
  }
  //   console.dir(await steps, { depth: null })
}
const main = async () => {
  await askQuestion('whats the weather in london ?')
}
main()

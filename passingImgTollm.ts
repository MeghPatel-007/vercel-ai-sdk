import { generateText } from 'ai'
import { env } from './env'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'

const systemPrompt =
  `You will receive an image.` +
  `Please create an alt text for the image.` +
  `Be concise.` +
  `Use adjectives only when necessary.` +
  `Do not pass 160 characters.` +
  `Use simple language.`

const openrouter = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
})

const openrouterModel = openrouter(env.OPENROUTER_MODEL)

// ? Image passing using image path
// export const describeImage = async (imagepath: string) => {
//   const imageAsUnit8Array = readFileSync(imagepath)
//   const { text } = await generateText({
//     model: openrouterModel,
//     system: systemPrompt,
//     messages: [
//       {
//         role: 'user',
//         content: [
//           {
//             type: 'file',
//             data: imageAsUnit8Array,
//             mediaType: 'image/jpeg',
//             filename: path.basename(imagepath),
//           },
//         ],
//       },
//     ],
//   })
//   return text
// }

export const describeImage = async (imageURL: string) => {
  const { text } = await generateText({
    model: openrouterModel,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            data: new URL(imageURL),
            mediaType: 'image/jpeg',
          },
        ],
      },
    ],
  })
  return text
}

const main = async () => {
  //   const description = await describeImage(path.join(__dirname, './images.jpg'))
  const description = await describeImage(
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
  )
  console.log(description)
}
main().catch(console.error)

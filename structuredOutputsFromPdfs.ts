import { generateText, Output } from 'ai'
import { env } from './env'
import { openrouter } from '@openrouter/ai-sdk-provider';
import z, { file } from 'zod'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const systemPrompt =
  `You will receive an invoice. ` + `Please extract the data from the invoice.`

const openrouterModel = openrouter(env.OPENROUTER_MODEL)

const schema = z
  .object({
    total: z.number().describe('The total amount of the invoice.'),
    currency: z.string().describe('The currency of the total amount.'),
    invoiceNumber: z.string().describe('The invoice number.'),
    companyAddress: z
      .string()
      .describe('The address of the company or person issuing the invoice.'),
    companyName: z
      .string()
      .describe('The name of the company issuing the invoice.'),
    invoiceAddress: z
      .string()
      .describe('The address of the company or person receiving the '),
  })
  .describe('The extracted data from the invoice.')

export const extractDataFromInvoice = async (invoicePath: string) => {
  const { output } = await generateText({
    model: openrouterModel,
    system: systemPrompt,
    output: Output.object({ schema }),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            data: readFileSync(invoicePath),
            mediaType: 'application/pdf',
          },
        ],
      },
    ],
  })
  return output
}

const main = async () => {
  const description = await extractDataFromInvoice(
    path.join(__dirname, './invoice.pdf'),
  )
  console.dir(description, { depth: null })
}
main().catch(console.error)

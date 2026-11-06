import { z } from 'zod'

const envSchema = z.object({
  GROQ_API_KEY: z.string().min(1, 'API Key cannot be empty'),
  GROQ_MODEL: z.string().min(1, 'Model cannot be empty'),
  OPENROUTER_API_KEY: z.string().min(1, 'API Key cannot be empty'),
  OPENROUTER_MODEL: z.string().min(1, 'Model cannot be empty'),
  OPENROUTER_EMBEDDING_MODEL: z.string().min(1, 'Model cannot be empty'),
})

export const env = envSchema.parse(process.env)

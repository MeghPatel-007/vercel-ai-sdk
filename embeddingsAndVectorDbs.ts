import { openrouter } from '@openrouter/ai-sdk-provider'
import { env } from './env'
import { cosineSimilarity, embed, embedMany } from 'ai'

const openrouterModel = openrouter.textEmbeddingModel(
  env.OPENROUTER_EMBEDDING_MODEL,
)

const values = ['dog', 'cat', 'car', 'bike']

const main = async () => {
  const { embeddings } = await embedMany({
    model: openrouterModel,
    values: values,
  })
  const vectordb = embeddings.map((embedding, index) => ({
    value: values[index],
    embedding,
  }))
  const searchTerm = await embed({
    model: openrouterModel,
    value: 'canine',
  })
  const entries = vectordb.map((entry) => {
    return {
      value: entry.value,
      similarity: cosineSimilarity(entry.embedding, searchTerm.embedding),
    }
  })
  const sortedEntries = entries.sort((a, b) => b.similarity - a.similarity)
  console.dir(sortedEntries, { depth: null })
}
main()

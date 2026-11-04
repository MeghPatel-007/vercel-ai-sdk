import type { ModelMessage } from 'ai'
const messages: ModelMessage[] = [
  { role: 'system', content: 'You are a friendly greeter' },
  {
    role: 'user',
    content: 'Hello,you!',
  },
  {
    role: 'assistant',
    content: 'Hi,there',
  },
]

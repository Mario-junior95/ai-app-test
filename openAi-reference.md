````md
# OpenAI Node.js SDK Reference

```ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

---

# Main APIs Overview

```txt
client
├── responses        ← MAIN modern API
├── chat             ← older ChatGPT-style API
├── completions      ← legacy GPT-3 API
├── embeddings       ← vector embeddings
├── images           ← image generation/editing
├── audio            ← speech/audio APIs
├── files            ← file uploads
├── vectorStores     ← RAG/document retrieval
├── fineTuning       ← model fine-tuning
├── realtime         ← live streaming/voice
├── batches          ← async large-scale jobs
└── beta             ← experimental APIs
```

---

# 1. client.responses (RECOMMENDED)

Modern unified API for almost everything.

Use for:

- Chatbots
- Text generation
- Vision
- Function calling
- JSON outputs
- Streaming
- Multimodal apps

---

## Basic Example

```ts
const response = await client.responses.create({
  model: "gpt-5",
  input: "Explain AI simply",
});

console.log(response.output_text);
```

---

## Chat Conversation

```ts
const response = await client.responses.create({
  model: "gpt-5",
  input: [
    {
      role: "user",
      content: "Hello",
    },
    {
      role: "assistant",
      content: "Hi!",
    },
    {
      role: "user",
      content: "Tell me a joke",
    },
  ],
});
```

---

## Image Input (Vision)

```ts
const response = await client.responses.create({
  model: "gpt-5",
  input: [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "What is in this image?",
        },
        {
          type: "input_image",
          image_url: "https://example.com/cat.jpg",
        },
      ],
    },
  ],
});
```

---

## Function Calling / Tools

```ts
const response = await client.responses.create({
  model: "gpt-5",
  input: "What's the weather in Beirut?",
  tools: [
    {
      type: "function",
      name: "get_weather",
      description: "Get weather information",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
          },
        },
        required: ["city"],
      },
    },
  ],
});
```

---

## Structured JSON Output

```ts
const response = await client.responses.create({
  model: "gpt-5",
  input: "Extract person info from: John is 25",
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "person",
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          age: {
            type: "number",
          },
        },
        required: ["name", "age"],
      },
    },
  },
});
```

---

## Streaming

```ts
const stream = await client.responses.stream({
  model: "gpt-5",
  input: "Write a poem",
});

for await (const event of stream) {
  console.log(event);
}
```

---

# When To Use `responses`

Use `client.responses` for ALL NEW PROJECTS unless you specifically need older APIs.

---

# 2. client.chat.completions

Older ChatGPT-style API.

Still commonly used.

---

## Example

```ts
const completion = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: "Hello!",
    },
  ],
});

console.log(completion.choices[0].message.content);
```

---

# When To Use `chat.completions`

Use if:

- Maintaining old code
- Using older frameworks
- Existing app already built around it

Avoid for new projects.

---

# responses vs chat.completions

| Feature         | responses | chat.completions |
| --------------- | --------- | ---------------- |
| Modern API      | ✅        | ❌               |
| Vision          | ✅        | Partial          |
| Structured JSON | ✅        | Limited          |
| Multimodal      | ✅        | Limited          |
| Future Features | ✅        | ❌               |
| Recommended     | ✅        | ❌               |

---

# 3. client.completions (LEGACY)

Old GPT-3 style API.

---

## Example

```ts
const response = await client.completions.create({
  model: "gpt-3.5-turbo-instruct",
  prompt: "Write a slogan",
});
```

---

# Should You Use It?

Almost never.

Only for very old legacy systems.

---

# 4. client.embeddings

Converts text into vectors.

Used for:

- Semantic search
- RAG
- AI search engines
- Recommendations

---

## Example

```ts
const embedding = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: "Hello world",
});

console.log(embedding.data[0].embedding);
```

---

# 5. client.images

Generate and edit images.

---

## Generate Image

```ts
const image = await client.images.generate({
  model: "gpt-image-1",
  prompt: "A futuristic city at night",
});
```

---

## Edit Image

```ts
const image = await client.images.edit({
  model: "gpt-image-1",
  image: fs.createReadStream("cat.png"),
  prompt: "Add sunglasses",
});
```

---

# 6. client.audio

Audio APIs.

Includes:

- Speech-to-text
- Text-to-speech
- Translation

---

## Speech-to-Text

```ts
const transcription = await client.audio.transcriptions.create({
  file: fs.createReadStream("audio.mp3"),
  model: "whisper-1",
});
```

---

## Text-to-Speech

```ts
const speech = await client.audio.speech.create({
  model: "gpt-4o-mini-tts",
  voice: "alloy",
  input: "Hello world",
});
```

---

# 7. client.files

Upload files.

Used for:

- Fine-tuning
- Assistants
- Batch jobs
- Vector stores

---

## Example

```ts
const file = await client.files.create({
  file: fs.createReadStream("data.jsonl"),
  purpose: "fine-tune",
});
```

---

# 8. client.vectorStores

Used for RAG/document search systems.

---

## Example

```ts
const store = await client.vectorStores.create({
  name: "Knowledge Base",
});
```

---

# 9. client.fineTuning

Train/customize models using your own data.

---

## Example

```ts
const job = await client.fineTuning.jobs.create({
  training_file: "file-abc123",
  model: "gpt-4o-mini",
});
```

---

# 10. client.batches

Large async processing jobs.

Useful for:

- Millions of requests
- Offline processing
- Bulk AI operations

---

# 11. client.realtime

Realtime websocket API.

Used for:

- Voice assistants
- Live conversations
- Realtime streaming

---

# 12. client.beta

Experimental APIs.

May include:

- Assistants
- Threads
- Runs
- Future OpenAI features

Can change frequently.

---

# Recommended Stack For New Projects

## Chat/Text

```ts
client.responses.create();
```

## Embeddings/RAG

```ts
client.embeddings.create();
```

## Images

```ts
client.images.generate();
```

## Audio

```ts
client.audio.*
```

---

# Quick Decision Table

| Goal                       | API                    |
| -------------------------- | ---------------------- |
| Chatbot                    | `responses`            |
| Structured JSON            | `responses`            |
| Vision/Image Understanding | `responses`            |
| Function Calling           | `responses`            |
| Legacy Chat App            | `chat.completions`     |
| Old GPT-3 Prompting        | `completions`          |
| Semantic Search            | `embeddings`           |
| Generate Images            | `images`               |
| Speech-to-Text             | `audio.transcriptions` |
| Text-to-Speech             | `audio.speech`         |
| RAG/Document Search        | `vectorStores`         |
| Fine-Tuning                | `fineTuning`           |

---

# Best Practice

For modern applications:

```ts
client.responses.create();
```

should be your default choice.

Everything else is specialized.
````

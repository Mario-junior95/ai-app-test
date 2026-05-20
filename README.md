# my-app

Monorepo with **client** and **server** packages. Git is managed at the repository root (not inside `packages/`).

## Install

```bash
bun install
```

## Run

```bash
# Server (http://localhost:8080)
bun run dev:server

# Client (calls the server)
bun run dev:client
```

## GitHub

Push from the project root so the full app is on GitHub:

```bash
git add .
git commit -m "your message"
git push origin main
```

Remote: `https://github.com/Mario-junior95/ai-app-test.git`

# Perplexity

A monorepo containing two main applications:

- `apps/client` — React + Vite frontend
- `apps/server` — Express backend with MongoDB, authentication, chat, AI, and Pinecone vector storage

## Workspace Structure

```
Perplexity/
  package.json          # root scripts and tooling
  readme.md             # this file
  apps/
    client/             # frontend app
    server/             # backend app
```

### apps/client

A React application built with Vite.

Key technologies:

- React 19
- Vite
- Redux Toolkit
- Tailwind CSS
- React Router
- Socket.io client
- Axios for API calls
- Markdown rendering with `react-markdown`

Important files:

- `apps/client/package.json` — client scripts and dependencies
- `apps/client/src/main.jsx` — client entry point
- `apps/client/src/app/App.jsx` — top-level UI container
- `apps/client/src/features/*` — auth, chat, and home feature modules

### apps/server

An Express.js backend with authentication, chat, and AI support.

Key technologies:

- Express 5
- MongoDB via Mongoose
- Socket.io server
- LangChain + Mistral AI integration
- Pinecone vector database for RAG embeddings
- Auth with JWT and refresh tokens
- Rate limiting, CORS, validation, and compression

Important files:

- `apps/server/package.json` — server scripts and dependencies
- `apps/server/server.js` — entry point starting the HTTP and socket server
- `apps/server/src/app.js` — Express app setup and middleware
- `apps/server/src/shared/Router/root.router.js` — primary API routing
- `apps/server/src/modules/auth` — auth routes, controller, validators, middleware
- `apps/server/src/modules/chats` — chat route handlers and models
- `apps/server/src/modules/AI` — AI/RAG services, prompts, models

## Root package

The root `package.json` is used for workspace-level scripts and developer tooling:

- `npm run dev` — starts both client and server concurrently
- `npm prepare` — initializes Husky hooks

## Local development

1. Install dependencies at the repository root:

```bash
npm install
```

2. Start both apps together:

```bash
npm run dev
```

This runs:

- `npm run dev --prefix apps/client` for the frontend
- `npm run dev --prefix apps/server` for the backend

## Server environment variables

The backend expects environment variables in `apps/server/.env` or the environment:

- `PORT`
- `MONGO_URI`
- `PINECONE_API_KEY`
- `PINECONE_INDEX`
- `PINECONE_HOST`
- `MISTRAL_API_KEY`
- `ALLOWED_ORIGIN`
- `REFRESH_TOKEN_KEY`
- `ACCESS_TOKEN_KEY`
- `REDIS_HOST`
- `REDIS_PASSWORD`
- `REDIS_PORT`
- `GOOGLE_API_KEY`
- `RESEND_API`

> Do not commit secrets or API keys to source control.

## API Endpoints

The backend mounts routes under `/perplexity`.

### Auth

- `POST /perplexity/auth/signup`
- `GET /perplexity/auth/verify_email`
- `POST /perplexity/auth/login`
- `GET /perplexity/auth/get_me`
- `GET /perplexity/auth/get_accessToken`
- `GET /perplexity/auth/logout`

### Chat

- `POST /perplexity/chat/message`
- `GET /perplexity/chat/:chatid/message`
- `GET /perplexity/chat`
- `DELETE /perplexity/chat/:chatid/delete`

## Notes

- The frontend and backend are separate apps inside `apps/`.
- The backend also supports socket communication via `apps/server/src/sockets/server.socket.js`.
- The current client README in `apps/client/README.md` is the default Vite template content.

## Recommended workflow

- Run `npm install` from the root once.
- Use `npm run dev` from the root during development.
- Use `npm run build` inside `apps/client` to build the frontend for production.
- Use environment variables to configure the backend securely.

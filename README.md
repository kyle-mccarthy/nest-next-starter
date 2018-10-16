# Nest.js and Next.js Example/Starter App (Fastify)

## Getting Started

```
yarn
yarn dev
```

## What is it?

This example outlines a Universal/Isomorphic javascript app build with Next and Nest.  Next
handles the SSR of React, while Nest handles the custom server, routing, etc...

## What does it come with?

- Next.js (SSR)
- Nest.js (Custom Routing)
- Typescript
- Nodemon
- Fastify

## How does it work?

Nest and Next are both bootstrapped in the `main.ts` file.  The request handler and render function
provided by Next are then bound to a service provided by the render module.  Global middleware provided
by the render module is added to the Nest app, along with a filter that catches any request that
doesn't map to a route and any errors thrown by Nest.  The render service overrides the default 
render function provided by express and implements the functionality provided by Next.
# weight-converter

A simple MCP server that exposes a `convert-weight` tool (kilograms ↔ pounds) with a visual widget. Built with the [mcp-use SDK](https://github.com/mcp-use/mcp-use) and deployed on Manufact Cloud.

I built this as a hands-on way to learn MCP and the Manufact build-and-deploy flow — scaffolding a server, exposing a tool, testing it against a live client, and deploying end-to-end.

**Live server:** https://wild-zero-ramz7.run.mcp-use.com/mcp

## What it does

Exposes a single tool, `convert-weight`, that converts a weight value between kilograms and pounds (handy for weightlifting). Returns both a structured result and a visual widget.

Example: `100 kg → 220.46 lb`

## Stack

- **TypeScript**
- **mcp-use SDK** — MCP server framework
- **Manufact Cloud** — hosting and deployment

## Run locally

```bash
npm install
npm run dev
```

Then open the inspector at `http://localhost:3000/inspector` to test the tool.

## Deploy

```bash
npm run deploy
```

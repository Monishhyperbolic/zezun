# The Gifting Curio

## Vercel setup

The Gift Finder calls the Vercel serverless function at `/api/gift-search`. The OpenAI key is only read by that server-side function and is never exposed to browser JavaScript.

In the Vercel project settings, add:

- `OPENAI_API_KEY` — your OpenAI API key
- `OPENAI_MODEL` — optional model override; defaults to `gpt-4o-mini`

Redeploy after saving environment variables. For local Vercel development, put the same values in an untracked `.env.local` file.
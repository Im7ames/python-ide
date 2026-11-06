# pico

A minimal, dependency-free Python IDE interface for the web. It is designed to deploy directly to **Cloudflare Pages**: the repository root is the build output directory and no build command is required.

## Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8788
```

The editor saves files in `localStorage`. The Run action is intentionally a small browser-side preview for `print()` statements; a real Python runtime can be added later with Pyodide or a Cloudflare Worker-backed execution service.

## Deploy to Cloudflare Pages

1. Create a Pages project from this repository.
2. Set **Build command** to blank.
3. Set **Build output directory** to `/` (the repository root).

Alternatively, deploy with Wrangler:

```bash
npx wrangler pages deploy . --project-name pico
```

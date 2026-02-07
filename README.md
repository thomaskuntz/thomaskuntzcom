# thomaskuntz.com

Personal website and blog built with React, Vite, and TailwindCSS.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Adding Blog Posts

Create a new `.md` file in `content/blog/` with YAML front matter:

```markdown
---
title: My Post Title
date: 2026-01-15
tags: [topic, another]
excerpt: A short description for the blog list.
---

Your markdown content here...
```

The slug is derived from the filename (e.g., `my-post.md` becomes `/blog/my-post`).

## Deployment

Deployed to GitHub Pages via GitHub Actions on push to `main`. The repo's Pages settings must use "GitHub Actions" as the source.

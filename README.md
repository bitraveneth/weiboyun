# 微泊云 WeiBoYun

Smart parking industry cloud marketing site — Next.js, Tailwind CSS, bilingual (`zh` default / `en`).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/zh`).

## Locales

- Chinese: `/zh`, `/zh/products`, …
- English: `/en`, `/en/products`, …

## Replace placeholder company facts

Edit [`src/config/company.ts`](src/config/company.ts) and the stats strings in [`messages/zh.json`](messages/zh.json) / [`messages/en.json`](messages/en.json).

## Design tokens

Cream background + trust blue accents are defined in [`src/app/globals.css`](src/app/globals.css). Font wordmark: [`src/components/Logo.tsx`](src/components/Logo.tsx).

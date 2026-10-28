#Simplte Hotel Booking Management

**Rendering Strategy:** Hybrid (Server + Client Components)

**Approach:** Follow Next.js 14+ (updated to Next.js 16.3) best practices

**Rendering Methods:**

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR) - optional
- Server Components (default)
- Client Components (when interactivity needed)

**Authentication:**

- Next.js recommended patterns (e.g., middleware, server sessions)
- Potentially using NextAuth.js or similar

**Characteristics:**

- Leverage Server Components for better performance
- Use Client Components selectively
- Optimized data fetching with server-side capabilities

## 🛠️ Development Tools

- **Linting & Formatting:** Biome
- **Type Checking:** TypeScript
- **Package Manager:** npm/yarn/pnpm

---

## ✅ Summary

- **Other sections:** Server/Client Component hybrid
- **Code quality:** Managed by **Biome**

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

---

.husky/pre-commit

```bash
pnpm exec lint-staged
```

.husky/commit-msg

```bash
pnpm exec commitlint --edit $1
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployed on Vercel

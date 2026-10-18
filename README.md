# a04.dev

Andrew Nguyen's portfolio, built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. Existing interactive effects use Framer Motion.

## Local development

Use a supported Node.js LTS release (Node 24 was used for this audit).

```powershell
npm ci
npm run dev -- --hostname 127.0.0.1
```

## Checks

```powershell
npm test
npm run lint
npx tsc --noEmit
npm run build
npm audit --omit=dev
```

Project content is in `app/lib/projects.ts`; skill categories and local icon paths are in `app/lib/skills.ts`. Icon sources are documented in [public/ICONS.md](public/ICONS.md).

Keep this checkout independent from sibling projects; initialize and run Git commands inside the individual repository. The production site is [a04.dev](https://a04.dev/); local edits do not publish automatically.

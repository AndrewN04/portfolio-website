# a04.dev

Andrew Nguyen's portfolio. Built with Next.js, TypeScript, Tailwind CSS, three.js, Lucide icons, and Framer Motion.

The site is one screen: a 3D server rack whose four servers open About, Skills, Projects, and Contact as windows, with particles spelling out the current role. Without WebGL the rack falls back to plain links.

## Run locally

Use Node.js 24 LTS and npm.

```powershell
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open [localhost:3000](http://127.0.0.1:3000).

## Edit content

- Projects: `app/lib/projects.ts`
- Skills and icon paths: `app/lib/skills.ts`
- Design notes: [DESIGN.md](DESIGN.md)
- Icon credits: [public/ICONS.md](public/ICONS.md)

## Checks

```powershell
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Both tests, lint, and types pass. The build passed before the final wheel-navigation change, which passed lint and type checks. Desktop and mobile navigation, layout, and animations were checked. Live contact-form delivery was not tested.

The public site is [a04.dev](https://a04.dev/). Local changes do not publish themselves.

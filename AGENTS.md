<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## UI component boundaries

- Check `src/components/ui` before creating a new UI primitive.
- Keep `src/components/ui` limited to shared, business-agnostic shadcn components.
- Place route-specific compositions in `src/app/transaction/_components`.
- Transaction feature pages and layouts reside under `src/app/transaction`.
- Add reusable variants to `src/components/ui` only when they remain generic and useful across routes.
- Add or update shadcn components through the shadcn CLI and review generated changes before using them.
- Import UI components through the configured alias, such as `@/components/ui/button`.

## Data Fetching & API conventions

- Use `@tanstack/react-query` and `micro-rq` for all server data fetching, caching, and server state management.
- Define API clients and REST resources once using `createMicroApi` and `api.resource`.
- Pass generated query and mutation configs directly to TanStack Query (e.g. `useQuery({ ...resource.endpoint.toQuery(params) })`).
- Do not create custom wrapper hooks or invent ad-hoc `fetch` calls around TanStack Query.
- Refer to the `micro-rq` skill documentation in `.agents/skills/micro-rq` for resource and query patterns.

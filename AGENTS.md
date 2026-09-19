<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project context

- This is a Persian RTL transaction-report take-home project.
- The main application route is `/transaction`.
- Match the desktop reference at `docs/design/transaction-desktop-1440.png`.
- Match the mobile reference at `docs/design/transaction-mobile-390.png`.
- Use a transaction table on desktop and transaction cards on mobile.

## UI component boundaries

- Check `src/components/ui` before creating a new UI primitive.
- Keep `src/components/ui` limited to shared, business-agnostic shadcn components.
- Place route-specific compositions in `src/app/transaction/_components`.
- Transaction feature pages and layouts reside under `src/app/transaction`.
- Add reusable variants to `src/components/ui` only when they remain generic and useful across routes.
- Add or update shadcn components through the shadcn CLI and review generated changes before using them.
- Import UI components through the configured alias, such as `@/components/ui/button`.

## Component organization

- Define each route-specific or feature React component in its own file; do not declare secondary component functions inside another feature component's file. Generated shared UI primitives may retain their upstream file structure.
- Keep React components focused on declarative rendering, composition, event wiring, and local UI state.
- Move non-trivial pure logic—such as formatting, data transformation, pagination or range generation, query-parameter normalization, reusable mappings, and shared constants—out of component files.
- Place transaction-specific helpers in `src/app/transaction/_utils`, application-wide helpers in `src/lib`, and reusable React hooks in `src/hooks`.
- Keep a trivial expression next to the JSX when extracting it would make the code harder to follow. Prefer extraction when logic contains branches or loops, represents a reusable rule, or can be tested independently from React.

## Data Fetching & API conventions

- Use `@tanstack/react-query` and `micro-rq` for HTTP server state consumed by Server and Client Components.
- Define API clients and REST resources once using `createMicroApi` and `api.resource`.
- Pass generated query and mutation configs directly to TanStack Query (e.g. `useQuery({ ...resource.endpoint.toQuery(params) })`).
- Server Components may prefetch data with `QueryClient` using the same generated `micro-rq` query config that Client Components pass to `useQuery`, then hydrate that cache through `HydrationBoundary`.
- Do not use React Query inside Route Handlers. Route Handlers are responsible only for validating HTTP requests, accessing data, and constructing HTTP responses.
- Do not create custom wrapper hooks or invent ad-hoc `fetch` calls around TanStack Query.
- Refer to the `micro-rq` skill documentation in `.agents/skills/micro-rq` for resource and query patterns.

## Transaction behavior

- Represent search, status, date range, page, and page size in the URL.
- Reset `page` to `1` whenever search, status, date range, or page size changes.
- Never send the complete transaction dataset to the browser for client-side filtering or pagination. Send filters and pagination to the Route Handler and return only the requested page plus pagination metadata such as `totalCount`.
- Normalize or reject out-of-range page and page-size values consistently across URL parsing and the Route Handler.

## Async states

- Use one responsive transaction-results Skeleton for every loading transition; do not use Spinner or `keepPreviousData` for transaction-result loading.
- Keep the stable page shell, including the title and filter controls, outside `Suspense`. Put the asynchronous prefetch and hydration subtree inside the boundary so the shell can stream immediately.
- Reuse the same responsive Skeleton as the `Suspense` fallback for initial server loading and while Client Component queries are fetching after search, filter, pagination, or refresh changes.
- Debounce search requests so the Skeleton does not flash for every keystroke.
- Use Empty for no-result and blocking-error states, and provide a retry action for errors.
- Use Sonner only for non-blocking feedback when usable data can remain visible, such as a failed manual refresh with cached data.
- Preserve request cancellation through the `AbortSignal` forwarded by generated `micro-rq` query configs.
- Older responses must never overwrite the latest search or filter result.

## Responsive and accessibility

- Verify `/transaction` at 390px and 1440px widths against the committed design references.
- Use a table on desktop and cards on mobile.
- Mobile interactive controls must have a touch target of at least 44px by 44px.
- Icon-only buttons require an accessible Persian label.
- Dialogs require a title, focus management, and keyboard-accessible close behavior.

## State Management & URL conventions

- Use `nuqs` as the single source of truth for all URL search parameters and filter state.
- Do not introduce external global client stores (such as Zustand or Redux); combine `nuqs` (URL state), `@tanstack/react-query` (server state), and React `useState` (transient UI state).
- Use `zod` for all data schemas, runtime validation, and type inference.

## Verification

After relevant code changes, run:

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm format:check`
- `pnpm build`

For UI changes, also verify `/transaction` at both 390px and 1440px widths. Do not consider the task complete while any required check fails.

## Code review

- After every task that changes repository files, use the repository `$code-review` skill at `.agents/skills/code-review` to review the final task diff before declaring completion.
- In completion-gate mode, resolve actionable findings within the authorized task scope, rerun affected verification, and review the resulting diff once more.
- For standalone review or analysis requests, keep the review read-only unless the user explicitly asks for fixes.
- State the review result, checks performed, and any residual risks in the final response.

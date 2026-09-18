# TanStack Query Integration

`micro-rq` returns plain TanStack Query config pieces. Keep using TanStack Query directly.

## Queries

```tsx
const usersQuery = useQuery({
  ...users.list.toQuery({ page: 1 }),
  staleTime: 60_000,
});
```

`toQuery()` returns only:

```ts
{
  queryKey,
  queryFn,
}
```

Add TanStack Query options at the call site:

```tsx
const userQuery = useQuery({
  ...users.detail.toQuery(userId),
  enabled: Boolean(userId),
});
```

`toQuery()` forwards TanStack Query's `AbortSignal` to `fetch`. When TanStack Query
cancels a query, the underlying HTTP request is cancelled too.

## Mutations

```tsx
const createUser = useMutation({
  ...users.create.toMutation(),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: users.list.baseKey(),
    });
  },
});

createUser.mutate({
  name: "John",
});
```

`toMutation()` returns only:

```ts
{
  mutationFn,
}
```

Pass mutation variables to `mutate()` or `mutateAsync()`, not to `toMutation()`.

## Infinite queries

Use `toInfiniteQuery()` to connect an endpoint to `useInfiniteQuery`.

```tsx
const postsQuery = useInfiniteQuery({
  ...posts.list.toInfiniteQuery({
    initialPageParam: 0,
    keyVariables: {
      tag,
      limit: 20,
    },
    getVariables: ({ pageParam, keyVariables }) => ({
      skip: pageParam,
      ...keyVariables,
    }),
  }),
  getNextPageParam: (lastPage) => {
    const nextSkip = lastPage.skip + lastPage.limit;
    return nextSkip < lastPage.total ? nextSkip : undefined;
  },
});
```

`getVariables` maps TanStack Query's `pageParam` to the endpoint variables, so
page numbers, offsets, and cursors all work. `keyVariables` contains stable
filters and page size that identify the complete list. The generated key is:

```ts
[apiName, resourceName, endpointName, "infinite", keyVariables | null]
```

The page parameter is excluded because all pages belong to one infinite-query
cache entry. Normal and infinite queries use different keys because their
cached data shapes differ. `baseKey()` still matches both for invalidation.

Keep `getNextPageParam` in `useInfiniteQuery`; it depends on the response shape
and remains TanStack Query's responsibility. The generated infinite `queryFn`
forwards the cancellation signal to `fetch`.

## Direct calls

Use `fn` for tests, server prefetching helpers, or direct imperative calls.

```ts
const runDetail = users.detail.fn("user-1");
const user = await runDetail();

const created = await users.create.fn({ name: "John" });
```

Query endpoint `fn` returns a zero-argument query function. Mutation endpoint `fn` executes immediately.
Direct `fn` calls are unchanged and do not receive TanStack Query's cancellation signal.

## Next.js hydration

Use generated query configs with TanStack Query prefetching.

```tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function UsersPage() {
  const queryClient = new QueryClient();
  const params = { page: 1 };

  await queryClient.prefetchQuery(users.list.toQuery(params));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersClient params={params} />
    </HydrationBoundary>
  );
}
```

Client components still call `useQuery` with the same generated config.

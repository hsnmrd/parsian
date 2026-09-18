# HttpOnly cookie sessions

HttpOnly cookies are stored and sent by the browser. JavaScript and `micro-rq`
do not read the cookie value.

## Upgrading from 0.2.x

This upgrade has no breaking changes. Existing bearer-token configurations
using `createTokenProvider` do not need to change.

If you created a token provider only to refresh an HttpOnly cookie session,
replace it with the API-level `refresh` configuration shown below. The direct
refresh operation may return no data, including a `204 No Content` response.
Configure refresh on the API or in `tokenProvider`, not both.

## Same-origin sessions

For a same-origin API, the default fetch credentials mode is enough:

```ts
export const api = createMicroApi({
  name: "main",
  baseUrl: "/api",
});
```

The backend can create and remove the session with `Set-Cookie`. No
`tokenProvider` or `authHeader` is needed.

## Cross-origin sessions

Use `credentials: "include"` when the API has another origin:

```ts
const cookieFetcher: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    credentials: "include",
  });

export const api = createMicroApi({
  name: "main",
  baseUrl: "https://api.example.com",
  fetcher: cookieFetcher,
});
```

The backend must allow credentialed CORS requests from the exact frontend
origin. Cross-site cookies normally require `SameSite=None; Secure`.

## Automatic cookie refresh

Use API-level `refresh` when a `401` should call a refresh endpoint that replaces
the HttpOnly cookie:

```ts
const authApi = createMicroApi({
  name: "auth",
  baseUrl: "/api",
});

const auth = authApi.resource("auth", {
  refresh: authApi.post<void>("/auth/refresh", {
    authMode: "none",
  }),
});

export const api = createMicroApi({
  name: "main",
  baseUrl: "/api",
  refresh: {
    fn: () => auth.refresh.fn(),
  },
});
```

The refresh endpoint may return `204 No Content`. After refresh succeeds,
`micro-rq` retries the original request once. Parallel `401` responses share
one refresh operation.

Configure refresh either with API-level `refresh` for cookie sessions or inside
`tokenProvider` for readable tokens, not both.

## Auth modes

Use the default `authMode: "optional"` for protected cookie endpoints. Cookie
values are intentionally unreadable, so `authMode: "required"` cannot verify
that a cookie exists and is intended for readable token providers.

Use `authMode: "none"` for login and refresh endpoints so a failed authentication
request does not start the refresh flow.

## Security and server rendering

Cookie-authenticated write requests need appropriate CSRF protection. Choose
`SameSite` carefully and use a CSRF token/header when the backend requires it.

In browser code, the browser stores `Set-Cookie` and sends cookies. During SSR,
server-side fetch does not automatically use the browser's cookie jar. Forward
the incoming `Cookie` header and propagate any `Set-Cookie` response through
your framework when server-side session requests need it.

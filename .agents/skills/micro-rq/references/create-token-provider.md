# createTokenProvider

Use `createTokenProvider` when requests need access tokens and optional refresh-on-401 behavior.

Do not create a token provider only to support HttpOnly cookies. Use API-level
`refresh` instead; see `http-only-cookies.md`.

## Migrating from 0.1.x to 0.2.0

Remove `refresh.selectAccessToken` and save refreshed tokens in
`refresh.onSuccess`.

```diff
refresh: {
  fn: ({ refreshToken }) => auth.refresh.fn({ refreshToken }),
- selectAccessToken: (tokens) => tokens.accessToken,
  onSuccess: (tokens) => {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  },
}
```

`onSuccess` is awaited before retry. The provider always calls
`getAccessToken`, so clearing application token storage logs out future
requests immediately.

```ts
import { createMicroApi, createTokenProvider } from "micro-rq";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const authApi = createMicroApi({
  name: "auth",
  baseUrl: "/api",
});

const auth = authApi.resource("auth", {
  refresh: authApi.post<AuthTokens, { refreshToken?: string | null }>("/refresh", {
    authMode: "none",
  }),
});

export const tokenProvider = createTokenProvider({
  getAccessToken: () => localStorage.getItem("accessToken"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  refresh: {
    fn: ({ refreshToken }) => auth.refresh.fn({ refreshToken }),
    onSuccess: (tokens) => {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    },
    onError: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const api = createMicroApi({
  name: "main",
  baseUrl: "/api",
  tokenProvider,
  authHeader: (token) => ({
    Authorization: `Bearer ${token}`,
  }),
});
```

## Refresh behavior

When a request returns `401` and refresh is configured, `micro-rq` refreshes once and retries the original request once. Parallel `401` responses share the same refresh promise.

`onSuccess` is awaited before the original request is retried. Save the new
tokens there so `getAccessToken` returns the new access token for the retry.

The token provider does not keep its own access-token copy. If the application
clears its token storage during logout, future requests see that change
immediately.

## Auth modes

- `optional`: Default. Use a token when one exists.
- `none`: Skip token lookup, auth header injection, and refresh-on-401.
- `required`: Require an access token before calling `fetch`; throws `MicroAuthRequiredError` if missing.

Use `authMode: "none"` for login, refresh, public, or anonymous endpoints.

Use `authMode: "required"` for endpoints that must never call the server without a token.

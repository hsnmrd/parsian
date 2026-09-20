import {
  createLoader,
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const transactionSearchParamsParsers = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  search: parseAsString.withDefault(""),
  status: parseAsStringLiteral(["ALL", "Successful", "Failed", "Pending"] as const).withDefault(
    "ALL"
  ),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
};

export const transactionSearchParamsCache = createSearchParamsCache(transactionSearchParamsParsers);

export const loadTransactionSearchParams = createLoader(transactionSearchParamsParsers);

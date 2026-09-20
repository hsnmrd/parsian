import { api } from "@/lib/api";
import {
  paginatedTransactionsSchema,
  type PaginatedTransactionsResponse,
  type TransactionFilterParams,
} from "../_types/transaction";

export const transactionsApi = api.resource("transactions", {
  list: api.get<PaginatedTransactionsResponse, TransactionFilterParams>("/transactions", {
    query: (params) => {
      const queryParams: Record<string, string | number> = {
        page: params.page,
        pageSize: params.pageSize,
      };

      if (params.search?.trim()) {
        queryParams.search = params.search.trim();
      }

      if (params.status && params.status !== "ALL") {
        queryParams.status = params.status;
      }

      if (params.from?.trim()) {
        queryParams.from = params.from.trim();
      }

      if (params.to?.trim()) {
        queryParams.to = params.to.trim();
      }

      return queryParams;
    },
    parse: (data) => paginatedTransactionsSchema.parse(data),
  }),
});

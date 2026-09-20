import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { transactionsApi } from "../_api/transactions-api";
import { transactionSearchParamsCache } from "../_params/transaction-search-params";
import { transactionFilterSchema } from "../_types/transaction";
import { TransactionResultsView } from "./transaction-results-view";

interface TransactionResultsDataProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function TransactionResultsData({ searchParams }: TransactionResultsDataProps) {
  const urlParams = await transactionSearchParamsCache.parse(searchParams);
  const filters = transactionFilterSchema.parse(urlParams);
  const queryClient = new QueryClient();

  await queryClient.query(transactionsApi.list.toQuery(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionResultsView />
    </HydrationBoundary>
  );
}

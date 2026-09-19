import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { transactionsApi } from "./_api/transactions-api";
import { transactionSearchParamsCache } from "./_params/transaction-search-params";
import { TransactionsView } from "./_components/transactions-view";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = "force-dynamic";

export default async function TransactionPage({ searchParams }: PageProps) {
  const parsedParams = await transactionSearchParamsCache.parse(searchParams);

  const queryClient = new QueryClient();
  await queryClient.query(transactionsApi.list.toQuery(parsedParams));

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionsView />
      </HydrationBoundary>
    </main>
  );
}

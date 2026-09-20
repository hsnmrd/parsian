import { Suspense } from "react";
import { TransactionResultsData } from "./_components/transaction-results-data";
import { TransactionsView } from "./_components/transactions-view";
import { TransactionResultsSkeleton } from "./_components/results/shared/transaction-results-skeleton";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = "force-dynamic";

export default function TransactionPage({ searchParams }: PageProps) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-10">
      <TransactionsView>
        <Suspense fallback={<TransactionResultsSkeleton />}>
          <TransactionResultsData searchParams={searchParams} />
        </Suspense>
      </TransactionsView>
    </main>
  );
}

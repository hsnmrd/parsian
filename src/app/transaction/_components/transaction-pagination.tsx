"use client";

import { useQueryStates } from "nuqs";
import { transactionSearchParamsParsers } from "../_params/transaction-search-params";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TransactionPaginationProps {
  totalPages: number;
}

function getPaginationPages(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

export function TransactionPagination({ totalPages }: TransactionPaginationProps) {
  const [{ page }, setFilters] = useQueryStates(transactionSearchParamsParsers);

  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setFilters({ page: newPage });
  };

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div
      className="flex min-h-17 flex-col items-center justify-between gap-4 border-t px-5 py-4 sm:flex-row"
      dir="rtl"
    >
      <div className="text-muted-foreground text-xs">
        صفحه {currentPage.toLocaleString("fa-IR")} از {totalPages.toLocaleString("fa-IR")}
      </div>

      <Pagination className="mx-0 w-auto justify-end" aria-label="صفحه‌بندی تراکنش‌ها">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text=""
              size="icon"
              variant="outline"
              aria-label="صفحه قبل"
              disabled={currentPage <= 1}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {pages.map((p, idx) =>
            p === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis className="size-9" />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === currentPage}
                  variant={p === currentPage ? "default" : "outline"}
                  aria-label={`صفحه ${p.toLocaleString("fa-IR")}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(p);
                  }}
                >
                  {p.toLocaleString("fa-IR")}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              text=""
              size="icon"
              variant="outline"
              aria-label="صفحه بعد"
              disabled={currentPage >= totalPages}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

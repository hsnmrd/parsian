"use client";

import { useQueryStates } from "nuqs";
import { transactionSearchParamsParsers } from "../../../_params/transaction-search-params";
import {
  getDesktopPaginationPages,
  getMobilePaginationPages,
} from "../../../_utils/pagination-pages";
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
  variant: "mobile" | "desktop";
}

export function TransactionPagination({ totalPages, variant }: TransactionPaginationProps) {
  const [{ page }, setFilters] = useQueryStates(transactionSearchParamsParsers);

  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setFilters({ page: newPage });
  };

  const isMobile = variant === "mobile";
  const pages = isMobile
    ? getMobilePaginationPages(currentPage, totalPages)
    : getDesktopPaginationPages(currentPage, totalPages);

  return (
    <div
      className={
        isMobile
          ? "bg-card flex min-h-16 items-center justify-center gap-4 rounded-lg border px-2 py-2 shadow-xs"
          : "flex min-h-17 items-center justify-between gap-4 border-t px-5 py-4"
      }
      dir="rtl"
    >
      {!isMobile && (
        <div className="text-muted-foreground text-xs">
          صفحه {currentPage} از {totalPages}
        </div>
      )}

      <Pagination
        className={`mx-0 w-auto ${isMobile ? "justify-center" : "justify-end"}`}
        aria-label="صفحه‌بندی تراکنش‌ها"
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text=""
              size="icon"
              variant="outline"
              className={isMobile ? "size-11" : undefined}
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
                <PaginationEllipsis className={isMobile ? "size-11" : "size-9"} />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === currentPage}
                  variant={p === currentPage ? "default" : "outline"}
                  size="icon"
                  className={isMobile ? "size-11" : undefined}
                  aria-label={`صفحه ${p}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              text=""
              size="icon"
              variant="outline"
              className={isMobile ? "size-11" : undefined}
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

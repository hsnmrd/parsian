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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionPaginationProps {
  totalPages: number;
  totalCount: number;
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

export function TransactionPagination({ totalPages, totalCount }: TransactionPaginationProps) {
  const [{ page, pageSize }, setFilters] = useQueryStates(transactionSearchParamsParsers);

  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setFilters({ page: newPage });
  };

  const handlePageSizeChange = (newSize: string | null) => {
    if (!newSize) return;
    const parsed = Number.parseInt(newSize, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setFilters({ pageSize: parsed, page: 1 });
    }
  };

  const pages = getPaginationPages(currentPage, totalPages);

  const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex flex-col items-center justify-between gap-4 py-2 sm:flex-row" dir="rtl">
      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
        <span>
          نمایش{" "}
          <strong className="text-foreground font-semibold">
            {startRecord.toLocaleString("fa-IR")}
          </strong>{" "}
          تا{" "}
          <strong className="text-foreground font-semibold">
            {endRecord.toLocaleString("fa-IR")}
          </strong>{" "}
          از{" "}
          <strong className="text-foreground font-semibold">
            {totalCount.toLocaleString("fa-IR")}
          </strong>{" "}
          تراکنش
        </span>

        <div className="flex items-center gap-1.5 border-s ps-3">
          <span>تعداد در صفحه:</span>
          <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
            <SelectTrigger size="sm" className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">۱۰</SelectItem>
                <SelectItem value="20">۲۰</SelectItem>
                <SelectItem value="50">۵۰</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text="قبلی"
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
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === currentPage}
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
              text="بعدی"
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

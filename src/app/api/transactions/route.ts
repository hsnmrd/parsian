import { NextRequest, NextResponse } from "next/server";
import { MOCK_TRANSACTIONS } from "@/app/transaction/_mock/seed-data";
import {
  transactionFilterSchema,
  type Transaction,
  type PaginatedTransactionsResponse,
} from "@/app/transaction/_types/transaction";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const parseResult = transactionFilterSchema.safeParse({
      page: searchParams.get("page") ?? 1,
      pageSize: searchParams.get("pageSize") ?? 10,
      search: searchParams.get("search") ?? "",
      status: searchParams.get("status") ?? "ALL",
      from: searchParams.get("from") ?? "",
      to: searchParams.get("to") ?? "",
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const params = parseResult.data;

    // Simulate network latency (500-800ms)
    const latency = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
    await sleep(latency);

    let filtered: Transaction[] = [...MOCK_TRANSACTIONS];

    // 1. Filter by status
    if (params.status && params.status !== "ALL") {
      filtered = filtered.filter((t) => t.status === params.status);
    }

    // 2. Filter by search query (customerName, cardNumber, ID)
    if (params.search && params.search.trim() !== "") {
      const query = params.search.trim().toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.customerName.toLowerCase().includes(query) ||
          t.cardNumber.includes(query) ||
          t.id.toString().includes(query)
      );
    }

    // 3. Filter by Date Range (from, to)
    if (params.from && params.from.trim() !== "") {
      const fromDate = new Date(params.from);
      if (!isNaN(fromDate.getTime())) {
        filtered = filtered.filter(
          (t) => new Date(t.transactionDate).getTime() >= fromDate.getTime()
        );
      }
    }

    if (params.to && params.to.trim() !== "") {
      const toDate = new Date(params.to);
      if (!isNaN(toDate.getTime())) {
        toDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter(
          (t) => new Date(t.transactionDate).getTime() <= toDate.getTime()
        );
      }
    }

    // 4. Query sorting (most recent transactions first)
    filtered.sort(
      (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
    );

    // 5. Pagination & totalCount
    const totalCount = filtered.length;
    const page = Math.max(1, params.page || 1);
    const pageSize = Math.max(1, Math.min(100, params.pageSize || 10));
    const totalPages = Math.ceil(totalCount / pageSize);

    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    const response: PaginatedTransactionsResponse = {
      data,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

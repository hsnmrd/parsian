"use client";

import { SearchIcon } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { transactionSearchParamsParsers } from "../../../_params/transaction-search-params";

const SEARCH_DEBOUNCE_MS = 450;

export function TransactionSearchFilter() {
  const [filters, setFilters] = useQueryStates(transactionSearchParamsParsers);

  function handleSearchChange(value: string) {
    void setFilters({ search: value, page: 1 }, { limitUrlUpdates: debounce(SEARCH_DEBOUNCE_MS) });
  }

  return (
    <Field className="gap-2">
      <FieldLabel htmlFor="transaction-search" className="sr-only lg:not-sr-only">
        جست‌وجو
      </FieldLabel>
      <InputGroup className="h-12 lg:h-11">
        <InputGroupInput
          id="transaction-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          value={filters.search}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="جست‌وجو براساس نام مشتری، شماره کارت یا شناسه"
          aria-label="جست‌وجوی تراکنش‌ها"
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}

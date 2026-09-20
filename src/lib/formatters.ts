export function formatCardNumber(card: string): string {
  if (card.length === 16) {
    return `${card.slice(0, 4)} ${card.slice(4, 8)} ${card.slice(8, 12)} ${card.slice(12)}`;
  }
  return card;
}

export function formatAmount(amount: number): string {
  return `${amount.toLocaleString("fa-IR")} ریال`;
}

export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  } catch {
    return isoString;
  }
}

import type { Transaction, TransactionStatus } from "../_types/transaction";

const FIRST_NAMES = [
  "علی",
  "محمد",
  "رضا",
  "حسین",
  "مهدی",
  "امیر",
  "سارا",
  "مریم",
  "زهرا",
  "فاطمه",
  "ندا",
  "پریسا",
  "علیرضا",
  "امید",
  "پویا",
  "مینا",
  "نیلوفر",
  "آرش",
  "سینا",
  "سحر",
  "کاوه",
  "فرهاد",
  "الهام",
  "ساناز",
];

const LAST_NAMES = [
  "احمدی",
  "محمدی",
  "مرادی",
  "حسینی",
  "کریمی",
  "کاظمی",
  "رستمی",
  "صادقی",
  "ابراهیمی",
  "قاسمی",
  "موسوی",
  "رضایی",
  "رحیمی",
  "صفری",
  "جعفری",
  "حیدری",
  "باقری",
  "فلاح",
  "سلطانی",
  "هاشمی",
  "نجفی",
  "طاهری",
];

const CARD_PREFIXES = [
  "603799",
  "610433",
  "589210",
  "621986",
  "502229",
  "627412",
  "639347",
  "505416",
  "636214",
  "628023",
  "589463",
  "627353",
];

const AMOUNTS = [
  150000, 250000, 500000, 750000, 1000000, 1250000, 1800000, 2400000, 3500000, 4800000, 5000000,
  6500000, 8200000, 10000000, 12500000, 15000000, 18000000, 24000000, 32000000, 45000000, 60000000,
  75000000, 95000000, 120000000,
];

// Linear Congruential Generator for reproducible deterministic data
function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateSeedTransactions(count = 600): Transaction[] {
  const random = createSeededRandom(42);
  const transactions: Transaction[] = [];

  // Start date: 2026-06-01 to 2026-09-18
  const baseTime = new Date("2026-09-18T12:00:00Z").getTime();
  const timeSpan = 110 * 24 * 60 * 60 * 1000; // ~110 days

  for (let i = 1; i <= count; i++) {
    const id = 10000 + i;
    const prefix = CARD_PREFIXES[Math.floor(random() * CARD_PREFIXES.length)];
    const middle = Math.floor(100000 + random() * 900000).toString();
    const suffix = Math.floor(1000 + random() * 9000).toString();
    const cardNumber = `${prefix}${middle}${suffix}`.slice(0, 16);

    const firstName = FIRST_NAMES[Math.floor(random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(random() * LAST_NAMES.length)];
    const customerName = `${firstName} ${lastName}`;

    const amount = AMOUNTS[Math.floor(random() * AMOUNTS.length)];

    const statusRoll = random();
    let status: TransactionStatus = "Successful";
    if (statusRoll < 0.15) {
      status = "Failed";
    } else if (statusRoll < 0.28) {
      status = "Pending";
    }

    // Distributed timestamps with realistic density
    const timestamp = baseTime - Math.floor(random() * timeSpan);
    const date = new Date(timestamp);
    const transactionDate = date.toISOString();

    transactions.push({
      id,
      cardNumber,
      amount,
      status,
      transactionDate,
      customerName,
    });
  }
  return transactions;
}

export const MOCK_TRANSACTIONS = generateSeedTransactions(600);

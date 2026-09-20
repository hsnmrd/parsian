import { MicroApiError } from "micro-rq";

const NETWORK_ERROR_MESSAGE = "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.";
const UNKNOWN_ERROR_MESSAGE = "خطای غیرمنتظره‌ای رخ داده است. لطفاً دوباره تلاش کنید.";

export function getUserFacingErrorMessage(error: unknown): string {
  if (error instanceof MicroApiError) {
    if (error.status === 400) return "درخواست نامعتبر است. لطفاً فیلترها را بررسی کنید.";
    if (error.status === 401) return "برای ادامه باید وارد حساب کاربری شوید.";
    if (error.status === 403) return "اجازه دسترسی به این اطلاعات را ندارید.";
    if (error.status === 404) return "اطلاعات موردنظر پیدا نشد.";
    if (error.status === 429) return "تعداد درخواست‌ها زیاد است. لطفاً کمی بعد دوباره تلاش کنید.";
    if (error.status >= 500) return "سرور در دسترس نیست. لطفاً دوباره تلاش کنید.";

    return UNKNOWN_ERROR_MESSAGE;
  }

  if (error instanceof TypeError) {
    return NETWORK_ERROR_MESSAGE;
  }

  return UNKNOWN_ERROR_MESSAGE;
}

import { createMicroApi, MicroApiError } from "micro-rq";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is required");
}

export const api = createMicroApi({
  name: "api",
  baseUrl,
  onError: (error) => {
    if (error instanceof DOMException && error.name === "AbortError") return;
    if (typeof window === "undefined") return;

    if (error instanceof MicroApiError) {
      const message =
        (error.data as { error?: string })?.error ||
        error.statusText ||
        `کد وضعیت: ${error.status}`;

      toast.error("خطا در ارتباط با سرور", {
        description: message,
      });
      return;
    }

    const message = error instanceof Error ? error.message : "خطای ناشناخته رخ داده است";
    toast.error("خطا در پردازش درخواست", {
      description: message,
    });
  },
});

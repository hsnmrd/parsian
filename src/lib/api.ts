import { createMicroApi, MicroApiError } from "micro-rq";
import { toast } from "sonner";

export const api = createMicroApi({
  name: "api",
  baseUrl: "/api",
  onError: (error) => {
    if (error instanceof DOMException && error.name === "AbortError") return;

    if (error instanceof MicroApiError) {
      const message = (error.data as { error?: string })?.error || error.statusText;

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

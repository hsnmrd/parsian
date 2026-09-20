import { createMicroApi, MicroApiError } from "micro-rq";
import { toast } from "sonner";
import { getUserFacingErrorMessage } from "@/lib/error-messages";

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
      toast.error("خطا در ارتباط با سرور", {
        description: getUserFacingErrorMessage(error),
      });
      return;
    }

    toast.error("خطا در پردازش درخواست", {
      description: getUserFacingErrorMessage(error),
    });
  },
});

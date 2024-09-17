import { useToast } from "~/components/ui/toast";

export interface ToastBody {
  title?: string;
  description: string;
}

const toast = {
  success: (body: ToastBody) => useToast().toast(body),
  error: (body: ToastBody) => useToast().toast({ ...body, variant: "destructive" }),
};
export default toast;

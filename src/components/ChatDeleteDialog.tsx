import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import LoadingButton from "./ui/loading-button";
import { useRouter, usePathname } from "next/navigation";

interface ChatDeleteDialogProps {
  id: string | null;
  setAllChats: (allChats: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChatDeleteDialog({
  id,
  setAllChats,
  open,
  setOpen,
}: ChatDeleteDialogProps) {
  const form = useForm();
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteChat = async () => {
    await fetch("/api/chatApi", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setAllChats((prev: any) => prev.filter((chat: any) => chat.id !== id));
    if (pathname === `/chat/${id}`) {
      router.push("/chat");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent style={{
        borderRadius: '10px',
      }} className="dark:bg-zinc-900 bg-white border-none dark:text-white text-zinc-900">
        <DialogHeader>
          <DialogTitle>Delete Chat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleDeleteChat)}
            className="space-y-3"
          >
            Are you sure you want to delete this chat?
            <DialogFooter className="gap-1 sm:gap-0">
              <LoadingButton
                className="dark:text-white text-white rounded-xl border dark:bg-red-950 bg-red-700 border-red-700 hover:bg-red-800 shadow-current shadow-sm"
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Delete
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

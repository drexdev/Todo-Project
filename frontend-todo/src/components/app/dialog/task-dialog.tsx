import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { TaskForm } from "./task-form";
import { ReactNode } from "react";

interface TaskDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  children: ReactNode;
  initialData?: {
    title?: string;
    description?: string;
  };
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, description: string) => void;
}

export function TaskDialog({
  isOpen,
  title,
  description,
  initialData,
  children,
  onOpenChange,
  onSubmit,
}: TaskDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-slate-950/70 backdrop-blur-sm inset-0 fixed" />
        <Dialog.Content className="animate-showDialog w-full md:w-[400px] h-full md:h-auto p-6 bg-white rounded-none md:rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl md:text-xl font-black">
            {title}
            <Dialog.Close asChild>
              <button className="absolute top-6 right-6">
                <X className="w-6 h-6 cursor-pointer" />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description className="text-slate-500 text-sm">
            {description}
          </Dialog.Description>

          <TaskForm onSubmit={onSubmit} {...initialData} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import type { ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
export default function Modal({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; children: ReactNode }) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal>
    <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
    <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6">
      <Dialog.Title>{title}</Dialog.Title>{children}<Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal></Dialog.Root>;
}

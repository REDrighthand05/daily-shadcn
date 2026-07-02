import { Toaster as SonnerToaster } from "sonner"
export { toast } from "sonner"

function Toaster() {
  return <SonnerToaster position="bottom-right" richColors closeButton />
}

export { Toaster }

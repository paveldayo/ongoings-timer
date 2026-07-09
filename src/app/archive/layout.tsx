import { Loader } from "lucide-react"
import { Suspense } from "react"

function GlobalLoader() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Loader className="animate-spin size-10" />
    </div>
  )
}

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
   <div>
    <Suspense fallback={<GlobalLoader />}>
      {children}
    </Suspense>
   </div>
  )
}

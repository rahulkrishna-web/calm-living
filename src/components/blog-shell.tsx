import type { ReactNode } from "react"
import Link from "next/link"
import { LeafIcon } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DownloadModal } from "@/components/download-modal"
import type { PostData } from "@/lib/markdown"

type BlogShellProps = {
  children: ReactNode
  currentSlug?: string
  description: string
  posts: Pick<PostData, "slug" | "title" | "date" | "excerpt">[]
  title: string
}

export function BlogShell({
  children,
  currentSlug,
  description,
  posts,
  title,
}: BlogShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar currentSlug={currentSlug} posts={posts} />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4"
              />
              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#8A9A82] text-white transition-transform group-hover:scale-105">
                  <LeafIcon className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-serif text-lg font-semibold tracking-tight">Calm Living</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">Journal</span>
                </div>
              </Link>
            </div>

            <DownloadModal />
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

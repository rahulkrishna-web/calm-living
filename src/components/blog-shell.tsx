import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex w-full items-center gap-3 px-4 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-1 data-vertical:h-4 data-vertical:self-auto"
            />
            <div className="min-w-0 flex-1">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-serif text-base sm:text-lg">
                      {title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  {currentSlug ? (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbPage>Essay</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  ) : null}
                </BreadcrumbList>
              </Breadcrumb>
              <p className="truncate text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

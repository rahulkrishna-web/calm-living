"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  FileTextIcon,
  MoreHorizontalIcon,
} from "lucide-react"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: ReactNode
    isActive?: boolean
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Latest Essays</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={item.isActive}>
              <Link href={item.url}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="aria-expanded:bg-muted"
                >
                  <MoreHorizontalIcon
                  />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem asChild>
                  <Link href={item.url}>
                    <FileTextIcon className="text-muted-foreground" />
                    <span>Open essay</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarDaysIcon className="text-muted-foreground" />
                  <span>Journal entry</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowRightIcon className="text-muted-foreground" />
                  <span>Continue reading</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="text-sidebar-foreground/70">
            <Link href="/">
              <MoreHorizontalIcon className="text-sidebar-foreground/70" />
              <span>View archive</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

"use client"

import type { ComponentProps } from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSettings } from "@/components/nav-settings"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BookOpenIcon,
  BookTextIcon,
  BrainIcon,
  ClipboardListIcon,
  HouseIcon,
  LampDeskIcon,
  LeafIcon,
  PenLineIcon,
  PenToolIcon,
  ShapesIcon,
  SparklesIcon,
  SunriseIcon,
} from "lucide-react"

type SidebarPost = {
  slug: string
  title: string
  date: string
  excerpt: string
}

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  currentSlug?: string
  posts: SidebarPost[]
}

export function AppSidebar({
  currentSlug,
  posts,
  ...props
}: AppSidebarProps) {
  const latestPost = posts[0]
  const featuredPosts = posts.slice(0, 5).map((post) => ({
    name: post.title,
    url: `/blog/${post.slug}`,
    icon: <PenLineIcon />,
    isActive: post.slug === currentSlug,
  }))

  const data = {
    brand: {
      name: "Calm Living",
      logo: <LeafIcon />,
      subtitle: "Journal",
    },
    navMain: [
      {
        title: "Read",
        icon: <BookOpenIcon />,
        isActive: !currentSlug,
        items: [
          {
            title: "All Essays",
            url: "/",
            isActive: !currentSlug,
          },
          ...(latestPost
            ? [
                {
                  title: "Latest Essays",
                  url: `/blog/${latestPost.slug}`,
                  isActive: latestPost.slug === currentSlug,
                },
              ]
            : []),
          {
            title: "Editor's Picks",
            url: "/",
          },
          {
            title: "Popular Reads",
            url: "/",
          },
        ],
      },
      {
        title: "Home & Spaces",
        icon: <HouseIcon />,
        items: [
          { title: "Cozy Home Design", url: "/blog/cozy-home-design" },
          { title: "Small Apartment Living", url: "/blog/small-apartment-living" },
          { title: "Bedroom Comfort", url: "/blog/bedroom-comfort" },
          { title: "Reading Nooks", url: "/blog/reading-nooks" },
          { title: "Balcony Spaces", url: "/blog/balcony-spaces" },
          { title: "Calm Corners", url: "/blog/calm-corners" },
          { title: "Lighting & Ambience", url: "/blog/lighting-and-ambience" },
          { title: "Minimal Interiors", url: "/blog/minimal-interiors" },
          { title: "Seasonal Decor", url: "/blog/seasonal-decor" },
        ],
      },
      {
        title: "Slow Living",
        icon: <SunriseIcon />,
        items: [
          { title: "Morning Rituals", url: "/" },
          { title: "Evening Rituals", url: "/" },
          { title: "Mindful Living", url: "/" },
          { title: "Digital Detox", url: "/" },
          { title: "Quiet Time", url: "/" },
          { title: "Simple Living", url: "/" },
          { title: "Intentional Living", url: "/" },
        ],
      },
      {
        title: "Design Rituals",
        icon: <PenToolIcon />,
        items: [
          { title: "Decluttering", url: "/" },
          { title: "Aesthetic Organization", url: "/" },
          { title: "Shelf Styling", url: "/" },
          { title: "Workspace Design", url: "/" },
          { title: "Home Reset Rituals", url: "/" },
          { title: "Calm Workspaces", url: "/" },
        ],
      },
      {
        title: "Mind & Wellbeing",
        icon: <BrainIcon />,
        items: [
          { title: "Mindfulness", url: "/" },
          { title: "Stress Reduction", url: "/" },
          { title: "Mental Clarity", url: "/" },
          { title: "Breathing Practices", url: "/" },
          { title: "Journaling", url: "/" },
          { title: "Reflection", url: "/" },
        ],
      },
      {
        title: "Cozy Evenings",
        icon: <LampDeskIcon />,
        items: [
          { title: "Tea Rituals", url: "/" },
          { title: "Reading Time", url: "/" },
          { title: "Candle Atmosphere", url: "/" },
          { title: "Rainy Day Living", url: "/" },
          { title: "Night Reset", url: "/" },
        ],
      },
      {
        title: "Books & Inspiration",
        icon: <BookTextIcon />,
        items: [
          { title: "Reading Notes", url: "/" },
          { title: "Book Reviews", url: "/" },
          { title: "Ideas & Philosophy", url: "/" },
          { title: "Quotes", url: "/" },
          { title: "Thought Essays", url: "/" },
        ],
      },
      {
        title: "Productivity",
        icon: <ShapesIcon />,
        items: [
          { title: "Intentional Work", url: "/" },
          { title: "Deep Work", url: "/" },
          { title: "Creative Focus", url: "/" },
          { title: "Digital Minimalism", url: "/" },
          { title: "Planning Systems", url: "/" },
        ],
      },
      {
        title: "Guides",
        icon: <ClipboardListIcon />,
        items: [
          { title: "Cozy Bedroom Guide", url: "/" },
          { title: "Balcony Setup Guide", url: "/" },
          { title: "Minimal Living Guide", url: "/" },
          { title: "Evening Routine Guide", url: "/" },
          { title: "Reading Corner Guide", url: "/" },
        ],
      },
      {
        title: "Editorial",
        icon: <SparklesIcon />,
        items: [
          { title: "About", url: "/editorial/about" },
          { title: "Editorial Philosophy", url: "/editorial/editorial-philosophy" },
          { title: "Writing Process", url: "/editorial/writing-process" },
          { title: "Why This Journal Exists", url: "/editorial/why-this-journal-exists" },
        ],
      },
    ],
    projects: featuredPosts,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher brand={data.brand} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavSettings />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

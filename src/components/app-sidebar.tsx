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
          { title: "Morning Rituals", url: "/blog/morning-rituals" },
          { title: "Evening Rituals", url: "/blog/evening-rituals" },
          { title: "Mindful Living", url: "/blog/mindful-living" },
          { title: "Digital Detox", url: "/blog/digital-detox" },
          { title: "Quiet Time", url: "/blog/quiet-time" },
          { title: "Simple Living", url: "/blog/simple-living" },
          { title: "Intentional Living", url: "/blog/intentional-living" },
        ],
      },
      {
        title: "Design Rituals",
        icon: <PenToolIcon />,
        items: [
          { title: "Decluttering", url: "/blog/decluttering" },
          { title: "Aesthetic Organization", url: "/blog/aesthetic-organization" },
          { title: "Shelf Styling", url: "/blog/shelf-styling" },
          { title: "Workspace Design", url: "/blog/workspace-design" },
          { title: "Home Reset Rituals", url: "/blog/home-reset-rituals" },
          { title: "Calm Workspaces", url: "/blog/calm-workspaces" },
        ],
      },
      {
        title: "Mind & Wellbeing",
        icon: <BrainIcon />,
        items: [
          { title: "Mindfulness", url: "/blog/mindfulness" },
          { title: "Stress Reduction", url: "/blog/stress-reduction" },
          { title: "Mental Clarity", url: "/blog/mental-clarity" },
          { title: "Breathing Practices", url: "/blog/breathing-practices" },
          { title: "Journaling", url: "/blog/journaling" },
          { title: "Reflection", url: "/blog/reflection" },
        ],
      },
      {
        title: "Cozy Evenings",
        icon: <LampDeskIcon />,
        items: [
          { title: "Tea Rituals", url: "/blog/tea-rituals" },
          { title: "Reading Time", url: "/blog/reading-time" },
          { title: "Candle Atmosphere", url: "/blog/candle-atmosphere" },
          { title: "Rainy Day Living", url: "/blog/rainy-day-living" },
          { title: "Night Reset", url: "/blog/night-reset" },
        ],
      },
      {
        title: "Books & Inspiration",
        icon: <BookTextIcon />,
        items: [
          { title: "Reading Notes", url: "/blog/reading-notes" },
          { title: "Book Reviews", url: "/blog/book-reviews" },
          { title: "Ideas & Philosophy", url: "/blog/ideas-and-philosophy" },
          { title: "Quotes", url: "/blog/quotes" },
          { title: "Thought Essays", url: "/blog/thought-essays" },
        ],
      },
      {
        title: "Productivity",
        icon: <ShapesIcon />,
        items: [
          { title: "Intentional Work", url: "/blog/intentional-work" },
          { title: "Deep Work", url: "/blog/deep-work" },
          { title: "Creative Focus", url: "/blog/creative-focus" },
          { title: "Digital Minimalism", url: "/blog/digital-minimalism" },
          { title: "Planning Systems", url: "/blog/planning-systems" },
        ],
      },
      {
        title: "Guides",
        icon: <ClipboardListIcon />,
        items: [
          { title: "Cozy Bedroom Guide", url: "/blog/cozy-bedroom-guide" },
          { title: "Balcony Setup Guide", url: "/blog/balcony-setup-guide" },
          { title: "Minimal Living Guide", url: "/blog/minimal-living-guide" },
          { title: "Evening Routine Guide", url: "/blog/evening-routine-guide" },
          { title: "Reading Corner Guide", url: "/blog/reading-corner-guide" },
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

"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { MinusIcon, MoonIcon, PlusIcon, Settings2Icon, SunIcon } from "lucide-react"

const THEME_STORAGE_KEY = "calm-living-theme"
const FONT_STORAGE_KEY = "calm-living-font-scale"

type ThemeMode = "light" | "dark"

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

function applyFontScale(scale: number) {
  document.documentElement.style.setProperty("--base-font-scale", `${scale}px`)
}

export function NavSettings() {
  const { isMobile } = useSidebar()
  const [theme, setTheme] = React.useState<ThemeMode>("light")
  const [fontScale, setFontScale] = React.useState(16)

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    const storedFontScale = Number(window.localStorage.getItem(FONT_STORAGE_KEY))

    const initialTheme =
      storedTheme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

    setTheme(initialTheme)
    applyTheme(initialTheme)

    const initialFontScale =
      Number.isFinite(storedFontScale) && storedFontScale >= 14 && storedFontScale <= 18
        ? storedFontScale
        : 16

    setFontScale(initialFontScale)
    applyFontScale(initialFontScale)
  }, [])

  function updateTheme(nextTheme: ThemeMode) {
    setTheme(nextTheme)
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
  }

  function updateFontScale(nextScale: number) {
    const clamped = Math.max(14, Math.min(18, nextScale))
    setFontScale(clamped)
    window.localStorage.setItem(FONT_STORAGE_KEY, String(clamped))
    applyFontScale(clamped)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex size-8 items-center justify-center rounded-lg border border-sidebar-border bg-background">
                <Settings2Icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Settings</span>
                <span className="truncate text-xs text-muted-foreground">
                  Theme and reading size
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-sm font-medium">
              Reading Settings
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-3 p-2">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Theme
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={theme === "light" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => updateTheme("light")}
                  >
                    <SunIcon className="size-4" />
                    Light
                  </Button>
                  <Button
                    type="button"
                    variant={theme === "dark" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => updateTheme("dark")}
                  >
                    <MoonIcon className="size-4" />
                    Dark
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Font size
                </p>
                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => updateFontScale(fontScale - 1)}
                    aria-label="Decrease font size"
                  >
                    <MinusIcon className="size-4" />
                  </Button>
                  <span className="text-sm font-medium">{fontScale}px</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => updateFontScale(fontScale + 1)}
                    aria-label="Increase font size"
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

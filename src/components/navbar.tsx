import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          CALM<span className="text-muted-foreground font-light text-sm ml-1 select-none">LIVING</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Button variant="outline" size="sm">
            Subscribe
          </Button>
        </div>
      </div>
    </nav>
  )
}

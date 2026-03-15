import Link from 'next/link'
import { BlogShell } from '@/components/blog-shell'
import { getSortedPostsData } from '@/lib/markdown'
import { Button } from '@/components/ui/button'

export default function BlogLandingPage() {
  const posts = getSortedPostsData()

  return (
    <BlogShell
      description="Essays on rituals, clarity, and creating quieter systems for everyday life."
      posts={posts}
      title="Calm Living"
    >
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 lg:px-6 lg:py-10">
        <section className="grid gap-4 rounded-3xl border bg-card/80 p-6 shadow-sm lg:grid-cols-[minmax(0,1fr)_240px] lg:p-8">
          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              New journal format
            </p>
            <div className="space-y-3">
              <h1 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                A slower editorial layout built around reading, not distraction.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                The blog now uses a sidebar-first structure for navigating posts,
                topics, and the latest notes without leaving the reading flow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={posts[0] ? `/blog/${posts[0].slug}` : '/'}>
                  Read the latest post
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#latest">Browse all essays</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3 rounded-2xl border bg-muted/40 p-4">
            <div className="rounded-2xl bg-background p-4">
              <p className="text-sm text-muted-foreground">Posts published</p>
              <p className="mt-2 text-3xl font-semibold">{posts.length}</p>
            </div>
            <div className="rounded-2xl bg-background p-4">
              <p className="text-sm text-muted-foreground">Current cadence</p>
              <p className="mt-2 text-lg font-medium">Weekly long-form essays</p>
            </div>
          </div>
        </section>

        <section id="latest" className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Latest essays</h2>
              <p className="text-sm text-muted-foreground">
                Open a post from the sidebar or continue from the list below.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-3xl border bg-card/80 p-6 shadow-sm transition-colors hover:bg-secondary/70"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <time className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 max-w-2xl text-base leading-8 text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="relative z-10 w-fit px-0 text-sm"
                  >
                    <Link href={`/blog/${post.slug}`}>Open essay</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </BlogShell>
  )
}

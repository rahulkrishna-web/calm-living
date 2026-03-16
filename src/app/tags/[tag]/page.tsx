import { BlogShell } from '@/components/blog-shell'
import { getSortedPostsData } from '@/lib/markdown'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags.add(tag.toLowerCase().replace(/\s+/g, '-'))
    })
  })
  return Array.from(tags).map((tag) => ({
    tag,
  }))
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const posts = getSortedPostsData()
  
  const filteredPosts = posts.filter((post) => 
    post.tags?.some((t) => t.toLowerCase().replace(/\s+/g, '-') === tag)
  )

  const tagDisplay = tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <BlogShell
      description={`Essays filtered by tag: ${tagDisplay}`}
      posts={posts}
      title={`${tagDisplay} | Calm Living`}
    >
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 lg:px-6 lg:py-10">
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4 border-b border-border/80 pb-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Filtered by Tag
              </p>
              <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                {tagDisplay}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'essay' : 'essays'} in this category.
              </p>
            </div>
          </div>
          
          <div className="grid gap-4 mt-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
              ))
            ) : (
              <div className="rounded-3xl border border-dashed p-12 text-center">
                <p className="text-muted-foreground">No essays found for this tag.</p>
                <Button asChild className="mt-6" variant="outline">
                  <Link href="/">Back to all essays</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </BlogShell>
  )
}

import { notFound } from "next/navigation"

import { BlogShell } from "@/components/blog-shell"
import { getSortedPostsData } from "@/lib/markdown"
import { editorialPages, getEditorialPage } from "@/lib/editorial-pages"

export function generateStaticParams() {
  return editorialPages.map((page) => ({
    slug: page.slug,
  }))
}

export default async function EditorialPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getEditorialPage(slug)

  if (!page) {
    notFound()
  }

  const posts = getSortedPostsData()

  return (
    <BlogShell
      description={page.description}
      posts={posts}
      title={page.title}
    >
      <main className="flex w-full flex-1 px-4 py-8 lg:px-6 lg:py-10">
        <div className="w-full">
          <header className="border-b border-border/80 pb-10">
            <div className="rounded-[2rem] bg-secondary/40 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                {page.eyebrow}
              </p>
              <div className="mt-5 max-w-3xl">
                <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04]">
                  {page.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {page.intro}
                </p>
              </div>
            </div>
          </header>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_288px] lg:gap-10">
            <div className="max-w-3xl pl-0 sm:pl-8 lg:pl-10">
              <div className="space-y-12">
                {page.sections.map((section) => (
                  <section key={section.title} className="space-y-4">
                    <h2 className="font-serif text-3xl font-semibold tracking-tight">
                      {section.title}
                    </h2>
                    <div className="space-y-4 text-base leading-8 text-foreground/90 sm:text-[1.0625rem]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-10">
                <section>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Editorial Pages
                  </h2>
                  <div className="mt-3 h-px bg-border" />
                  <nav className="mt-4">
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {editorialPages.map((item) => (
                        <li key={item.slug}>
                          <a
                            href={`/editorial/${item.slug}`}
                            className={`block text-base/7 transition-colors hover:text-foreground ${
                              item.slug === page.slug ? "text-foreground" : ""
                            }`}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </BlogShell>
  )
}

import { BlogShell } from '@/components/blog-shell'
import { getPostData, getSortedPostsData } from '@/lib/markdown'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isValidElement, type ReactNode } from 'react'
import { Clock3Icon } from 'lucide-react'
import type { Metadata } from 'next'

type Heading = {
  id: string
  level: 2 | 3
  text: string
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('')
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children)
  }

  return ''
}

function getHeadings(content: string): Heading[] {
  return content
    .split('\n')
    .map((line) => line.match(/^(##|###)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      id: slugifyHeading(match[2]),
      level: match[1] === '##' ? 2 : 3,
      text: match[2].trim(),
    }))
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function getTagClasses(tag: string) {
  const key = tag.toLowerCase()

  if (key.includes('mind')) {
    return 'border-[#8A9A82]/40 bg-[#8A9A82]/12 text-[#5f7058]'
  }

  if (key.includes('design')) {
    return 'border-[#E9DFC8]/80 bg-[#E9DFC8]/55 text-[#6a5644]'
  }

  if (key.includes('ritual')) {
    return 'border-[#CFA8A1]/45 bg-[#CFA8A1]/18 text-[#8a5f58]'
  }

  return 'border-border/80 bg-card text-foreground'
}

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const postData = await getPostData(slug)
  
  const siteUrl = 'https://calm-living.com' // Replace with actual production URL

  return {
    title: `${postData.title} | Calm Living Journal`,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: 'article',
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: postData.date,
      authors: [postData.author ?? 'Calm Living'],
      tags: postData.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.excerpt,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const posts = getSortedPostsData()
  const postExists = posts.some((post) => post.slug === slug)

  if (!postExists) {
    notFound()
  }

  const postData = await getPostData(slug)
  const headings = getHeadings(postData.content)
  const readingTime = getReadingTime(postData.content)
  const tags =
    postData.tags && postData.tags.length > 0
      ? postData.tags
      : ['mindfulness', 'design rituals', 'slow living']

  const mdxComponents = {
    h1: () => null,
    h2: ({ children }: { children: ReactNode }) => {
      const text = extractText(children)
      return (
        <h2 id={slugifyHeading(text)} className="scroll-mt-24">
          {children}
        </h2>
      )
    },
    h3: ({ children }: { children: ReactNode }) => {
      const text = extractText(children)
      return (
        <h3 id={slugifyHeading(text)} className="scroll-mt-24">
          {children}
        </h3>
      )
    },
  }

  const siteUrl = 'https://calm-living.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description: postData.excerpt,
    datePublished: postData.date,
    author: {
      '@type': 'Person',
      name: postData.author ?? 'Calm Living',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calm Living',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`, // Update with actual logo URL
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
    },
  }

  return (
    <BlogShell
      currentSlug={slug}
      description={postData.excerpt}
      posts={posts}
      title={postData.title}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="flex w-full flex-1 px-4 py-8 lg:px-6 lg:py-10">
        <div className="w-full">
          <header className="border-b border-border/80 pb-10">
            <div className="rounded-[2rem] bg-secondary/40 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Essay
              </p>
              <div className="mt-5 max-w-3xl">
                <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02]">
                  {postData.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {postData.excerpt}
                </p>
                <div className="mt-8 border-t border-border/70 pt-5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium text-foreground">
                      {postData.author ?? 'Calm Living'}
                      {postData.handle ? (
                        <span className="ml-2 text-muted-foreground">· {postData.handle}</span>
                      ) : null}
                    </p>
                    <span className="hidden h-4 w-px bg-border sm:block" />
                    <time className="text-muted-foreground">
                      {new Date(postData.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="hidden h-4 w-px bg-border sm:block" />
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <Clock3Icon className="size-4" />
                      {readingTime} min read
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-sm ${getTagClasses(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_288px] lg:gap-10">
            <div className="max-w-3xl px-0 sm:px-6 lg:px-8">
              <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-semibold prose-a:text-primary hover:prose-a:opacity-80 transition-opacity">
                <MDXRemote source={postData.content} components={mdxComponents} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-10">
                <section>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Table of Contents
                  </h2>
                  <div className="mt-3 h-px bg-border" />
                  <nav className="mt-4">
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {headings.length > 0 ? (
                        headings.map((heading) => (
                          <li key={heading.id}>
                            <a
                              href={`#${heading.id}`}
                              className={`block transition-colors hover:text-foreground ${
                                heading.level === 3 ? 'pl-4 text-sm/6' : 'text-base/7'
                              }`}
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm/6">This essay has no section headings yet.</li>
                      )}
                    </ul>
                  </nav>
                </section>

                <section>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    More in this journal
                  </h2>
                  <div className="mt-3 h-px bg-border" />
                  <div className="mt-4 space-y-4">
                    {posts
                      .filter((post) => post.slug !== slug)
                      .slice(0, 3)
                      .map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="block transition-colors hover:text-foreground"
                        >
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="mt-2 text-xl font-medium leading-7 text-foreground">
                            {post.title}
                          </p>
                        </Link>
                      ))}
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </BlogShell>
  )
}

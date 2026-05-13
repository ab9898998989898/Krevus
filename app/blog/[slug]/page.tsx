import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Await params since it's required in newer Next.js versions
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug)
  if (!post) return { title: 'Not Found' }
  
  return {
    title: `${post.meta.title} | Krevus Blog`,
    description: post.meta.keyword ? `Learn more about ${post.meta.keyword}.` : 'Read our latest insights.',
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Await params
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  // Custom components for MDX
  const components = {
    h1: (props: any) => <h1 className="text-4xl md:text-5xl mt-12 mb-8 text-[color:var(--text-primary)] font-bold" {...props} />,
    h2: (props: any) => <h2 className="text-3xl mt-12 mb-6 text-[color:var(--text-primary)] font-bold" {...props} />,
    h3: (props: any) => <h3 className="text-2xl mt-8 mb-4 text-[color:var(--text-primary)] font-bold" {...props} />,
    p: (props: any) => <p className="text-lg text-[color:var(--text-body)] mb-6 leading-relaxed" {...props} />,
    ul: (props: any) => <ul className="space-y-4 mb-8" {...props} />,
    li: (props: any) => (
      <li className="flex items-start text-[color:var(--text-body)] text-lg">
        <span className="w-2 h-2 rounded-full bg-[color:var(--accent)] mt-2.5 mr-4 flex-shrink-0" />
        <span {...props} />
      </li>
    ),
    strong: (props: any) => <strong className="font-bold text-[color:var(--text-primary)]" {...props} />,
    a: (props: any) => <a className="text-[color:var(--accent)] hover:underline" {...props} />,
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-[72px]">
        <section className="py-24 md:py-32 hero-bg relative border-b border-[color:var(--border)]">
          <div className="container relative z-10 max-w-3xl mx-auto text-left">
            <Link href="/blog" className="inline-flex items-center text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[color:var(--text-primary)] mb-6 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.1]">
              {post.meta.title}
            </h1>
            
            <div className="flex items-center text-[color:var(--text-muted)]">
              <time dateTime={post.meta.date}>
                {new Date(post.meta.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.meta.keyword && (
                <>
                  <span className="mx-3">•</span>
                  <span className="text-[color:var(--accent)]">{post.meta.keyword}</span>
                </>
              )}
            </div>
          </div>
          <div className="noise-overlay" />
        </section>

        <section className="py-20 bg-[color:var(--bg-primary)]">
          <div className="container max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <MDXRemote source={post.content} components={components} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

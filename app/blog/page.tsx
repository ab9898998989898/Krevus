import { getBlogPosts } from '@/lib/blog'
import Link from 'next/link'

export const metadata = {
  title: 'Blog | Krevus Software Agency',
  description: 'Insights on custom software, fintech, tax portals, and real estate tech.',
}

export default function BlogIndex() {
  const posts = getBlogPosts()

  return (
    <main className="min-h-screen pt-32 pb-24 bg-krevus-dark text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Insights & <span className="text-krevus-purple">Articles</span>
          </h1>
          <p className="text-xl text-gray-400">
            Expert insights on building custom software for CPA firms, fintechs, and real estate.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="block bg-krevus-dark-card border border-krevus-border p-8 rounded-2xl hover:border-krevus-purple transition-all duration-300 group"
            >
              <h2 className="text-2xl font-bold mb-3 group-hover:text-krevus-purple transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center text-sm text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.keyword && (
                  <>
                    <span className="mx-3">•</span>
                    <span className="text-krevus-purple-light">{post.keyword}</span>
                  </>
                )}
              </div>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-2xl">
              <p>No articles found yet. Run the generator to populate!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

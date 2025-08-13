// app/page.tsx

import { getAllPosts } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import { Post } from '@/lib/types'

export default async function HomePage() {
  const posts: Post[] = await getAllPosts()

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Últimos Artigos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
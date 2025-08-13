// components/PostCard.tsx

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="block rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-white">
      {post.mainImage?.asset?.url && (
        <Image
          className="h-48 w-full object-cover"
          src={post.mainImage.asset.url}
          alt={post.title || 'Imagem do Post'}
          width={500}
          height={300}
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  )
}
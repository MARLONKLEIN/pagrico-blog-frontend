// components/PostCard.tsx

import Link from 'next/link'
import Image from 'next/image'
import { Post, urlFor } from '@/lib/sanity'

interface PostCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  // Formatação da data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Layout padrão simplificado
  return (
    <Link 
      href={`/blog/${post.slug.current}`} 
      className="group block rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
    >
      {post.mainImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={urlFor(post.mainImage.asset).width(400).height(225).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Categorias */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category._id}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-pagrico-blue"
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.title}
              </span>
            ))}
          </div>
        )}
        
        {/* Título */}
        <h3 className="text-lg font-semibold text-pagrico-blue mb-2 group-hover:opacity-80 transition-opacity">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4">
          {post.excerpt}
        </p>
        
        {/* Meta informações */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {post.author?.image && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.image.asset).width(24).height(24).url()}
                  alt={post.author.image.alt || post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm text-gray-700 font-medium">{post.author?.name}</span>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
            {post.readingTime && (
              <p className="text-xs text-gray-400">{post.readingTime} min</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
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

  // Layout para card em destaque
  if (variant === 'featured') {
    return (
      <Link 
        href={`/blog/${post.slug.current}`} 
        className="group block rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      >
        {post.mainImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={urlFor(post.mainImage.asset).width(600).height(340).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Badge de Destaque */}
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ Em Destaque
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {/* Categorias */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category._id}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  {category.icon && <span className="mr-1">{category.icon}</span>}
                  {category.title}
                </span>
              ))}
            </div>
          )}
          
          {/* Título */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Meta informações */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {post.author?.image && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(post.author.image.asset).width(32).height(32).url()}
                    alt={post.author.image.alt || post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author?.name}</p>
                <p className="text-xs text-gray-500">{post.author?.role}</p>
              </div>
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

  // Layout compacto
  if (variant === 'compact') {
    return (
      <Link 
        href={`/blog/${post.slug.current}`} 
        className="group flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {post.mainImage && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={urlFor(post.mainImage.asset).width(80).height(80).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
            {post.title}
          </h4>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{formatDate(post.publishedAt)}</span>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} min</span>
              </>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Layout padrão
  return (
    <Link 
      href={`/blog/${post.slug.current}`} 
      className="group block rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {post.mainImage && (
        <div className="relative aspect-video overflow-hidden">
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
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                style={{ backgroundColor: category.color + '20', color: category.color }}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.title}
              </span>
            ))}
          </div>
        )}
        
        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
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
            <span className="text-sm text-gray-700">{post.author?.name}</span>
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
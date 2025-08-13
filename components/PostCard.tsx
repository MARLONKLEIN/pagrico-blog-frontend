import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Post } from '@/lib/sanity'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className={`group cursor-pointer ${featured ? 'md:col-span-2' : ''}`}>
      <Link href={`/blog/${post.slug.current}`} className="block">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
          {/* Imagem do Post */}
          <div className="relative aspect-video overflow-hidden">
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage.asset).width(600).height(400).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            
            {/* Badge de Post em Destaque */}
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ Destaque
                </span>
              </div>
            )}

            {/* Categorias */}
            <div className="absolute bottom-4 left-4">
              <div className="flex flex-wrap gap-2">
                {post.categories?.slice(0, 2).map((category) => (
                  <span
                    key={category._id}
                    className="px-2 py-1 rounded-md text-xs font-medium text-white backdrop-blur-sm"
                    style={{ backgroundColor: category.color + '90' }}
                  >
                    {category.icon} {category.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Conteúdo do Card */}
          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              {/* Autor */}
              <div className="flex items-center gap-2">
                {post.author?.image && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(post.author.image.asset).width(32).height(32).url()}
                      alt={post.author.image.alt || post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="font-medium">{post.author?.name}</span>
              </div>

              <span>•</span>
              
              {/* Data */}
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>

              {/* Tempo de leitura */}
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime} min de leitura</span>
                </>
              )}
            </div>

            {/* Título */}
            <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${
              featured ? 'text-xl md:text-2xl' : 'text-lg'
            }`}>
              {post.title}
            </h2>

            {/* Resumo */}
            <p className={`text-gray-600 line-clamp-3 ${
              featured ? 'text-base' : 'text-sm'
            }`}>
              {post.excerpt}
            </p>

            {/* CTA */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                Ler artigo completo →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Componente para o card em destaque na home
export function FeaturedPostCard({ post }: { post: Post }) {
  return <PostCard post={post} featured={true} />
}

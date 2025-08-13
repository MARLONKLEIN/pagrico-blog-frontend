import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client, urlFor, POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from '@/lib/sanity'
import type { Post } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import { PortableTextComponents } from '@/components/PortableTextComponents'

interface PostPageProps {
  params: { slug: string }
}

// Gerar metadados dinâmicos para SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post: Post = await client.fetch(POST_BY_SLUG_QUERY, { slug: params.slug })

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  const seoTitle = post.seoTitle || post.title
  const description = post.metaDescription || post.excerpt

  return {
    title: `${seoTitle} | Blog PagRico`,
    description,
    keywords: [post.focusKeyword, ...(post.keywords || [])],
    authors: [{ name: post.author?.name || 'PagRico' }],
    openGraph: {
      title: seoTitle,
      description,
      type: 'article',
      url: `https://pagrico.com/blog/${post.slug.current}`,
      images: [
        {
          url: post.mainImage 
            ? urlFor(post.mainImage.asset).width(1200).height(630).url()
            : 'https://pagrico.com/og-blog-default.jpg',
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || post.title,
        },
      ],
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'PagRico'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description,
      images: [
        post.mainImage 
          ? urlFor(post.mainImage.asset).width(1200).height(630).url()
          : 'https://pagrico.com/og-blog-default.jpg'
      ],
    },
  }
}

// Gerar todas as rotas estáticas no build time
export async function generateStaticParams() {
  const posts = await client.fetch(POST_SLUGS_QUERY)
  
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }))
}

async function getPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })
  return post || null
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDateISO = (dateString: string) => {
    return new Date(dateString).toISOString()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb e Navegação */}
      <nav className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex space-x-4 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                PagRico
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                Blog
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">{post.title}</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header do Artigo */}
        <header className="mb-12">
          {/* Categorias */}
          <div className="flex flex-wrap gap-3 mb-6">
            {post.categories?.map((category) => (
              <Link
                key={category._id}
                href={`/blog?category=${category.slug.current}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80"
                style={{ backgroundColor: category.color + '20', color: category.color }}
              >
                <span className="mr-1">{category.icon}</span>
                {category.title}
              </Link>
            ))}
          </div>

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Resumo */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Metadados do artigo */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-8 border-b border-gray-200">
            {/* Autor */}
            <div className="flex items-center gap-3">
              {post.author?.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(post.author.image.asset).width(48).height(48).url()}
                    alt={post.author.image.alt || post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{post.author?.name}</p>
                <p className="text-sm text-gray-500">{post.author?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>•</span>
              
              {/* Data de publicação */}
              <time dateTime={formatDateISO(post.publishedAt)}>
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
          </div>
        </header>

        {/* Imagem Principal */}
        {post.mainImage && (
          <figure className="mb-12">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={urlFor(post.mainImage.asset).width(1200).height(675).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            {post.mainImage.caption && (
              <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
                {post.mainImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Conteúdo do Post */}
        <div className="prose prose-lg prose-gray max-w-none">
          <PortableText
            value={post.body}
            components={PortableTextComponents}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Informações do Autor */}
        {post.author && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex gap-4">
              {post.author.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image.asset).width(64).height(64).url()}
                    alt={post.author.image.alt || post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {post.author.name}
                </h3>
                <p className="text-sm text-blue-600 mb-2">{post.author.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.author.bio}
                </p>
                
                {/* Expertise */}
                {post.author.expertise && post.author.expertise.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-900 mb-2">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {post.author.expertise.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Redes Sociais */}
                {post.author.socialLinks && (
                  <div className="mt-3 flex gap-3">
                    {post.author.socialLinks.linkedin && (
                      <a
                        href={post.author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {post.author.socialLinks.twitter && (
                      <a
                        href={post.author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="Twitter/X"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Posts Relacionados */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              📚 Leia também
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {post.relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.mainImage
              ? urlFor(post.mainImage.asset).width(1200).height(630).url()
              : undefined,
            author: {
              '@type': 'Person',
              name: post.author?.name || 'PagRico',
            },
            publisher: {
              '@type': 'Organization',
              name: 'PagRico',
              logo: {
                '@type': 'ImageObject',
                url: 'https://pagrico.com/logo-schema.png',
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://pagrico.com/blog/${post.slug.current}`,
            },
            keywords: [post.focusKeyword, ...(post.keywords || [])].join(', '),
          }),
        }}
      />
    </div>
  )
}

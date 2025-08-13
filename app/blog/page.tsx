import { Metadata } from 'next'
import { client, POSTS_QUERY, FEATURED_POSTS_QUERY } from '@/lib/sanity'
import type { Post } from '@/lib/sanity'
import PostCard, { FeaturedPostCard } from '@/components/PostCard'

interface BlogPageProps {
  searchParams: { category?: string }
}

export const metadata: Metadata = {
  title: 'Blog PagRico - Insights sobre Pagamentos Internacionais e Fintech',
  description: 'Descubra as últimas tendências em pagamentos internacionais, stablecoins, PIX internacional e soluções fintech para empresas.',
  keywords: ['pagamentos internacionais', 'stablecoins', 'PIX internacional', 'fintech brasil', 'pagamentos B2B'],
  openGraph: {
    title: 'Blog PagRico - Pagamentos Internacionais',
    description: 'Insights e tendências sobre pagamentos globais para empresas',
    type: 'website',
    url: 'https://pagrico.com/blog',
    images: [
      {
        url: 'https://pagrico.com/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog PagRico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog PagRico - Pagamentos Internacionais',
    description: 'Insights sobre pagamentos globais para empresas',
    images: ['https://pagrico.com/og-blog.jpg'],
  },
}

async function getPosts(): Promise<Post[]> {
  return await client.fetch(POSTS_QUERY)
}

async function getFeaturedPosts(): Promise<Post[]> {
  return await client.fetch(FEATURED_POSTS_QUERY)
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [posts, featuredPosts] = await Promise.all([
    getPosts(),
    getFeaturedPosts()
  ])

  const filteredPosts = searchParams.category 
    ? posts.filter(post => 
        post.categories?.some(cat => 
          cat.slug.current === searchParams.category
        )
      )
    : posts

  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Blog */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Blog PagRico
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Insights sobre pagamentos internacionais, fintech e o futuro do dinheiro digital
            </p>
            
            {/* Breadcrumb */}
            <nav className="mt-6" aria-label="Breadcrumb">
              <ol className="flex justify-center space-x-4 text-sm">
                <li>
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    PagRico
                  </a>
                </li>
                <li className="text-gray-500">/</li>
                <li className="text-gray-900 font-medium">Blog</li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Posts em Destaque */}
        {!searchParams.category && featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                📌 Posts em Destaque
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Filtros de Categoria */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3">
            <a
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !searchParams.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos os Posts
            </a>
            
            {/* Categorias principais da PagRico */}
            {[
              { slug: 'pagamentos-internacionais', title: '🌐 Pagamentos Internacionais' },
              { slug: 'stablecoins', title: '🪙 Stablecoins' },
              { slug: 'pix-internacional', title: '⚡ PIX Internacional' },
              { slug: 'cripto-para-empresas', title: '🏢 Cripto B2B' },
              { slug: 'drex-e-real-digital', title: '🏦 Drex & Real Digital' },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/blog?category=${category.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  searchParams.category === category.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </a>
            ))}
          </div>
        </section>

        {/* Grid de Posts */}
        <section>
          {searchParams.category && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Posts sobre {searchParams.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
              </p>
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum post encontrado
              </h3>
              <p className="text-gray-600">
                {searchParams.category 
                  ? 'Não há posts nesta categoria ainda.'
                  : 'Estamos preparando conteúdo incrível para você!'
                }
              </p>
              <a 
                href="/blog" 
                className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver todos os posts
              </a>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* CTA de Newsletter */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            📬 Receba insights exclusivos
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Fique por dentro das últimas tendências em pagamentos internacionais e fintech. 
            Enviamos apenas conteúdo de alta qualidade, sem spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Inscrever-se
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

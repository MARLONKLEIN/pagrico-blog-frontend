import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getFeaturedPosts } from '@/lib/sanity'
import type { Post } from '@/lib/sanity'
import PostCard from '@/components/PostCard'

interface HomePageProps {
  searchParams: Promise<{ category?: string }>
}

export const metadata: Metadata = {
  title: 'Blog PagRico - Insights sobre Pagamentos Internacionais e Fintech',
  description: 'Descubra as últimas tendências em pagamentos internacionais, stablecoins, PIX internacional e soluções fintech para empresas.',
  keywords: ['pagamentos internacionais', 'stablecoins', 'PIX internacional', 'fintech brasil', 'pagamentos B2B'],
  openGraph: {
    title: 'Blog PagRico - Pagamentos Internacionais',
    description: 'Insights e tendências sobre pagamentos globais para empresas',
    type: 'website',
    url: 'https://blog.pagrico.com',
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

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams
  const [posts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts()
  ])

  const filteredPosts = resolvedSearchParams.category 
    ? posts.filter(post => 
        post.categories?.some(cat => 
          cat.title.toLowerCase().includes(resolvedSearchParams.category!.toLowerCase())
        )
      )
    : posts

  return (
    <div className="min-h-screen bg-white">
      {/* Header do Blog */}
      <header className="pt-24 pb-16 bg-gradient-to-br from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00033D] to-[#1a0d5c] rounded-2xl mb-6">
              <span className="text-white font-bold text-2xl">📖</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#00033D] mb-4">
              Blog PagRico
            </h1>
            <p className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto">
              Insights sobre pagamentos internacionais, fintech e o futuro do dinheiro digital
            </p>
            
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex justify-center items-center space-x-2 text-sm">
                <li>
                  <Link href="https://pagrico.com" className="text-[#00033D] hover:text-[#00033D]/80 font-medium">
                    PagRico
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li className="text-slate-700 font-medium">Blog</li>
              </ol>
            </nav>

            {/* Filtros de Categoria */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !resolvedSearchParams.category
                    ? 'bg-[#00033D] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                Todos os Posts
              </Link>
              
              {/* Categorias principais da PagRico */}
              {[
                { slug: 'pagamentos-internacionais', title: 'Pagamentos Internacionais', icon: '🌐' },
                { slug: 'stablecoins', title: 'Stablecoins', icon: '🪙' },
                { slug: 'pix-internacional', title: 'PIX Internacional', icon: '⚡' },
                { slug: 'cripto-para-empresas', title: 'Cripto B2B', icon: '🏢' },
                { slug: 'drex-e-real-digital', title: 'Drex & Real Digital', icon: '🏦' },
              ].map((category) => (
                <Link
                  key={category.slug}
                  href={`/?category=${category.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    resolvedSearchParams.category === category.slug
                      ? 'bg-[#00033D] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Posts em Destaque */}
        {!resolvedSearchParams.category && featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#00033D] mb-4">
                ⭐ Posts em Destaque
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Conteúdo selecionado especialmente para você ficar por dentro das principais tendências
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post._id} post={post} variant="featured" />
              ))}
            </div>
          </section>
        )}

        {/* Grid de Posts */}
        <section>
          {resolvedSearchParams.category && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#00033D] mb-4">
                Posts sobre {resolvedSearchParams.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </h2>
              <p className="text-slate-600">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
              </p>
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-2xl mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-[#00033D] mb-4">
                Nenhum post encontrado
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                {resolvedSearchParams.category 
                  ? 'Não há posts nesta categoria ainda. Estamos trabalhando em novo conteúdo!'
                  : 'Estamos preparando conteúdo incrível para você!'
                }
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00033D] text-white font-semibold rounded-lg hover:bg-[#00033D]/90 transition-all duration-300 hover:-translate-y-0.5"
              >
                Ver todos os posts
              </Link>
            </div>
          ) : (
            <>
              {!resolvedSearchParams.category && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#00033D] mb-4">
                    Todos os Artigos
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Explore nosso acervo completo de insights sobre pagamentos internacionais e fintech
                  </p>
                </div>
              )}
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* CTA de Newsletter */}
        <section className="mt-20 bg-gradient-to-r from-[#00033D] to-[#1a0d5c] rounded-2xl p-8 text-center shadow-xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              📬 Receba insights exclusivos
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Fique por dentro das últimas tendências em pagamentos internacionais e fintech. 
              Enviamos apenas conteúdo de alta qualidade, sem spam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#00ffaa] focus:outline-none"
              />
              <button className="px-6 py-3 bg-[#00ffaa] text-[#00033D] rounded-lg font-bold hover:bg-[#00ffaa]/90 transition-all duration-300 hover:-translate-y-0.5">
                Inscrever-se
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
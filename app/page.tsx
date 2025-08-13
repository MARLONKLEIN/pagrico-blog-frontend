import Link from 'next/link'
import { getAllPosts } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PagRico - Blog sobre Fintech e Pagamentos',
  description: 'Descubra as últimas tendências em fintech, pagamentos internacionais e tokenização no blog oficial da PagRico.',
  keywords: 'fintech, pagamentos, tokenização, criptomoedas, PagRico, blog financeiro',
}

export default async function HomePage() {
  const posts = await getAllPosts()
  const featuredPosts = posts.slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pagrico-blue to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Bem-vindo ao Blog da PagRico
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Sua fonte de informações sobre fintech, pagamentos internacionais e inovações financeiras
          </p>
          <div className="space-x-4">
            <Link
              href="/blog"
              className="bg-pagrico-green text-pagrico-blue px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors"
            >
              Ver Todos os Posts
            </Link>
            <Link
              href="/blog?category=tokenizacao"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pagrico-blue transition-colors"
            >
              Tokenização
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-pagrico-blue mb-8">
            Posts em Destaque
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-pagrico-blue mb-8">
            Explore por Categoria
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Tokenização', slug: 'tokenizacao', color: 'bg-green-100 text-green-800' },
              { name: 'Pagamentos', slug: 'pagamentos-internacionais', color: 'bg-blue-100 text-blue-800' },
              { name: 'Educação', slug: 'educacao-financeira', color: 'bg-purple-100 text-purple-800' },
              { name: 'Notícias', slug: 'noticias-fintech', color: 'bg-yellow-100 text-yellow-800' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/blog?category=${category.slug}`}
                className={`${category.color} p-6 rounded-lg text-center font-semibold hover:shadow-lg transition-shadow`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-pagrico-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mantenha-se Atualizado
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Receba as últimas novidades sobre fintech e inovações financeiras
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-1 px-4 py-3 rounded-lg text-pagrico-blue"
            />
            <button className="bg-pagrico-green text-pagrico-blue px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

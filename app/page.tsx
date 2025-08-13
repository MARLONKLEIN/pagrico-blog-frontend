// app/page.tsx

import { getAllPosts } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import type { Post } from '@/lib/sanity'

export default async function HomePage() {
  const posts: Post[] = await getAllPosts()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 gradient-pagrico rounded-2xl mb-6">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-pagrico-blue mb-6">
              Blog PagRico
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Insights sobre pagamentos internacionais, stablecoins e o futuro dos pagamentos digitais para empresas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#posts"
                className="px-8 py-3 bg-pagrico-blue text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Ver Artigos
              </a>
              <a
                href="/"
                className="px-8 py-3 border-2 border-pagrico-blue text-pagrico-blue font-semibold rounded-lg hover:bg-pagrico-blue hover:text-white transition-colors"
              >
                ← Voltar ao Site
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pagrico-blue mb-4">
              Últimos Artigos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mantenha-se atualizado com as últimas tendências em pagamentos globais
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Em breve, novos artigos
              </h3>
              <p className="text-gray-600 mb-8">
                Estamos preparando conteúdo incrível sobre pagamentos internacionais para você
              </p>
              <a
                href="/"
                className="px-6 py-3 bg-pagrico-blue text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Explorar PagRico
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-pagrico">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para revolucionar seus pagamentos?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Descubra como a PagRico pode transformar a forma como sua empresa 
            recebe pagamentos internacionais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-pagrico-green text-pagrico-blue font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Conhecer PagRico
            </a>
            <a
              href="/blog"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-pagrico-blue transition-colors"
            >
              Ver Todos os Posts
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
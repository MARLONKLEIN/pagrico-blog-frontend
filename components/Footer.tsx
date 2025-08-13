// components/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold">PagRico</span>
            </div>
            <p className="text-gray-300 max-w-md leading-relaxed">
              O futuro dos pagamentos internacionais. Receba em cripto, converta para reais, 
              automaticamente. Para construtoras e empresas que vendem globalmente.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Blog</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/blog" className="hover:text-white transition-colors">Todos os Posts</Link></li>
              <li><Link href="/blog?category=pagamentos-internacionais" className="hover:text-white transition-colors">Pagamentos Internacionais</Link></li>
              <li><Link href="/blog?category=stablecoins" className="hover:text-white transition-colors">Stablecoins</Link></li>
              <li><Link href="/blog?category=pix-internacional" className="hover:text-white transition-colors">PIX Internacional</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">PagRico</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Preços</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 PagRico. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="text-gray-400 hover:text-white text-sm transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
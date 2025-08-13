// components/Header.tsx

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="https://pagrico.com"
              className="flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              PagRico
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="https://pagrico.com"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-blue-600 font-medium"
            >
              Blog
            </Link>
            <Link
              href="https://pagrico.com#services"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="https://pagrico.com#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Preços
            </Link>
          </nav>
          <div className="hidden md:block">
            <Link
              href="https://pagrico.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Acessar Plataforma
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              aria-label="Menu mobile"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
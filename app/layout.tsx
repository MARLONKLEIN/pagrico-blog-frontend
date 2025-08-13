import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PagRico Blog - Pagamentos Internacionais e Fintech',
    template: '%s | PagRico Blog'
  },
  description: 'Insights sobre pagamentos internacionais, stablecoins, PIX internacional e soluções fintech para empresas brasileiras.',
  keywords: ['pagamentos internacionais', 'stablecoins', 'PIX internacional', 'fintech brasil', 'pagamentos B2B', 'cripto empresas'],
  authors: [{ name: 'PagRico' }],
  creator: 'PagRico',
  publisher: 'PagRico',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://pagrico.com/blog',
    title: 'PagRico Blog - Pagamentos Internacionais',
    description: 'Insights sobre pagamentos globais para empresas',
    siteName: 'PagRico Blog',
    images: [
      {
        url: 'https://pagrico.com/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'PagRico Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PagRico Blog - Pagamentos Internacionais',
    description: 'Insights sobre pagamentos globais para empresas',
    images: ['https://pagrico.com/og-blog.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        
        {/* Analytics e outras tags podem ir aqui */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics ou outros scripts de tracking
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','YOUR-GTM-ID');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Header Global */}
        <Header />
        
        {/* Conteúdo Principal */}
        <main role="main">
          {children}
        </main>
        
        {/* Footer Global */}
        <Footer />

        {/* Scripts de terceiros */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=YOUR-GTM-ID"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  )
}

// Header Component
function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo PagRico */}
          <div className="flex-shrink-0">
            <a 
              href="https://pagrico.com" 
              className="flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              PagRico
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="https://pagrico.com" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </a>
            <a 
              href="/blog" 
              className="text-blue-600 font-medium"
            >
              Blog
            </a>
            <a 
              href="https://pagrico.com#services" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Serviços
            </a>
            <a 
              href="https://pagrico.com#pricing" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Preços
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://pagrico.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Acessar Plataforma
            </a>
          </div>

          {/* Mobile menu button */}
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

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
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

          {/* Links do Blog */}
          <div>
            <h3 className="font-semibold mb-4">Blog</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/blog" className="hover:text-white transition-colors">Todos os Posts</a></li>
              <li><a href="/blog?category=pagamentos-internacionais" className="hover:text-white transition-colors">Pagamentos Internacionais</a></li>
              <li><a href="/blog?category=stablecoins" className="hover:text-white transition-colors">Stablecoins</a></li>
              <li><a href="/blog?category=pix-internacional" className="hover:text-white transition-colors">PIX Internacional</a></li>
            </ul>
          </div>

          {/* Links da empresa */}
          <div>
            <h3 className="font-semibold mb-4">PagRico</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://pagrico.com" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="https://pagrico.com#services" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="https://pagrico.com#pricing" className="hover:text-white transition-colors">Preços</a></li>
              <li><a href="https://pagrico.com/contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 PagRico. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacidade
            </a>
            <a href="/termos" className="text-gray-400 hover:text-white text-sm transition-colors">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

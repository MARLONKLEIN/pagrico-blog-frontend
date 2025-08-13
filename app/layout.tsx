import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
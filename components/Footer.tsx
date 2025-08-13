// components/Footer.tsx

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-6 transition-transform duration-150 ease-out hover:scale-105"
              title="PagRico - Página inicial"
            >
              <Image 
                src="https://s3.us-east-2.amazonaws.com/pagrico.com/assets/logo+branco+PagRico.svg" 
                alt="PagRico" 
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-300 max-w-lg leading-relaxed text-base mb-6">
              O gateway de pagamentos da nova economia. Simples, seguro, rápido e global.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#00033D] hover:text-[#00ffaa] transition-all duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2"
                aria-label="Instagram da PagRico"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#00033D] hover:text-[#00ffaa] transition-all duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2"
                aria-label="LinkedIn da PagRico"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#00033D] hover:text-[#00ffaa] transition-all duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2"
                aria-label="YouTube da PagRico"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/sobre" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  href="/carreiras" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Carreiras
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/#services" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Pagamentos Globais
                </Link>
              </li>
              <li>
                <Link 
                  href="/white-label" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  White Label
                </Link>
              </li>
              <li>
                <Link 
                  href="/solucoes-personalizadas" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Soluções Personalizadas
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/contato" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  href="/termos" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacidade" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} PagRico. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link 
              href="/termos" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
            >
              Termos de Uso
            </Link>
            <Link 
              href="/privacidade" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
            >
              Política de Privacidade
            </Link>
            <Link 
              href="/cookies" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
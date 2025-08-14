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
              href="https://pagrico.com/"
              className="inline-block mb-6 transition-transform duration-150 ease-out hover:scale-105"
              title="PagRico - Página inicial"
              target="_blank"
              rel="noopener noreferrer"
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
            
            {/* Redes Sociais - Usando Phosphor Icons igual ao site principal */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/pagricobr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#00033D] hover:text-[#00ffaa] transition-all duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2"
                aria-label="Instagram da PagRico"
              >
                <i className="ph-bold ph-instagram-logo text-xl" aria-hidden="true"></i>
              </a>
              <a
                href="https://linkedin.com/company/pagrico"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#00033D] hover:text-[#00ffaa] transition-all duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2"
                aria-label="LinkedIn da PagRico"
              >
                <i className="ph-bold ph-linkedin-logo text-xl" aria-hidden="true"></i>
              </a>
              <a
                href="https://youtube.com/@pagricobr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#00033D] hover:text-[#00ffaa] transition-all duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2"
                aria-label="YouTube da PagRico"
              >
                <i className="ph-bold ph-youtube-logo text-xl" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://pagrico.com/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  href="https://pagrico.com/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Carreiras
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
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
                  href="https://pagrico.com/#services" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pagamentos Globais
                </Link>
              </li>
              <li>
                <Link 
                  href="https://pagrico.com/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  White Label
                </Link>
              </li>
              <li>
                <Link 
                  href="https://pagrico.com/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  href="https://pagrico.com/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  href="https://pagrico.com/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link 
                  href="https://pagrico.com/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
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
              href="https://pagrico.com/" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Termos de Uso
            </Link>
            <Link 
              href="https://pagrico.com/" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </Link>
            <Link 
              href="https://pagrico.com/" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
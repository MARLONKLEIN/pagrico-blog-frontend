// components/Header.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'py-3 bg-white/95 backdrop-blur-[20px] shadow-sm border-b border-slate-200' 
          : 'py-4 bg-white/90 backdrop-blur-[20px] border-b border-slate-200/50'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-decoration-none transition-transform duration-150 ease-out hover:scale-105 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm"
            title="PagRico - Página inicial"
          >
            <Image 
              src="https://s3.us-east-2.amazonaws.com/pagrico.com/assets/logo+PagRico.svg" 
              alt="PagRico" 
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="relative text-slate-600 font-medium py-2 transition-colors duration-300 hover:text-[#00033D] focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00033D] to-[#00ffaa] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="relative text-[#00033D] font-medium py-2 transition-colors duration-300 hover:text-[#00033D]/80 focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00033D] to-[#00ffaa]"></span>
            </Link>
            <Link
              href="/#services"
              className="relative text-slate-600 font-medium py-2 transition-colors duration-300 hover:text-[#00033D] focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm group"
            >
              Serviços
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00033D] to-[#00ffaa] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#pricing"
              className="relative text-slate-600 font-medium py-2 transition-colors duration-300 hover:text-[#00033D] focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 focus:rounded-sm group"
            >
              Preços
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00033D] to-[#00ffaa] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00033D] text-white font-semibold text-base border-2 border-transparent rounded-lg transition-all duration-300 hover:bg-[#00033D]/90 hover:-translate-y-0.5 hover:shadow-lg focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2 relative overflow-hidden group min-h-[48px]"
            >
              <span className="relative z-10">Acessar Plataforma</span>
              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-[100%]"></span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#00033D] hover:bg-slate-100 rounded-lg transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-2 focus:outline-[#00ffaa] focus:outline-offset-2"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
          id="mobile-menu"
        >
          <div className="py-4 px-2 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg border border-slate-200">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className="px-4 py-3 text-slate-600 hover:text-[#00033D] hover:bg-slate-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="px-4 py-3 text-[#00033D] bg-slate-50 rounded-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/#services"
                className="px-4 py-3 text-slate-600 hover:text-[#00033D] hover:bg-slate-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link
                href="/#pricing"
                className="px-4 py-3 text-slate-600 hover:text-[#00033D] hover:bg-slate-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Preços
              </Link>
              <div className="border-t border-slate-200 mt-2 pt-2">
                <Link
                  href="/"
                  className="block px-4 py-3 bg-[#00033D] text-white text-center font-semibold rounded-lg hover:bg-[#00033D]/90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Acessar Plataforma
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
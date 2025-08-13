import { PortableTextComponents as PortableTextComponentsType } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export const PortableTextComponents: PortableTextComponentsType = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={urlFor(value.asset).width(800).height(450).url()}
              alt={value.alt || 'Imagem do post'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    // Bloco de código customizado
    code: ({ value }) => (
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6">
        <code className={`language-${value.language || 'text'}`}>
          {value.code}
        </code>
      </pre>
    ),

    // Quote/Citação customizada
    blockquote: ({ value }) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg">
        <div className="text-lg italic text-gray-700">
          {value.children.map((child: any, index: number) => (
            <span key={index}>{child.text}</span>
          ))}
        </div>
      </blockquote>
    ),

    // Callout/Destaque
    callout: ({ value }) => {
      const type = value.type || 'info'
      const icons = {
        info: '💡',
        warning: '⚠️',
        success: '✅',
        error: '❌'
      }
      
      const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        error: 'bg-red-50 border-red-200 text-red-900'
      }

      return (
        <div className={`border-l-4 p-4 rounded-r-lg my-6 ${styles[type as keyof typeof styles]}`}>
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">
              {icons[type as keyof typeof icons]}
            </span>
            <div>
              {value.title && (
                <h4 className="font-semibold mb-2">{value.title}</h4>
              )}
              <div>{value.content}</div>
            </div>
          </div>
        </div>
      )
    }
  },

  block: {
    // Títulos customizados
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24" id={slugify(children)}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-5 scroll-mt-24" id={slugify(children)}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 scroll-mt-24" id={slugify(children)}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24" id={slugify(children)}>
        {children}
      </h4>
    ),

    // Parágrafos
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-6">
        {children}
      </p>
    ),

    // Citações
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 py-4 my-8 bg-blue-50 rounded-r-lg">
        <div className="text-lg italic text-gray-700">
          {children}
        </div>
      </blockquote>
    ),
  },

  list: {
    // Lista ordenada
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 pl-4">
        {children}
      </ol>
    ),
    
    // Lista não ordenada
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 pl-4">
        {children}
      </ul>
    ),
  },

  listItem: {
    // Itens de lista ordenada
    number: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">
        {children}
      </li>
    ),
    
    // Itens de lista não ordenada
    bullet: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">
        {children}
      </li>
    ),
  },

  marks: {
    // Texto em negrito
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">
        {children}
      </strong>
    ),
    
    // Texto em itálico
    em: ({ children }) => (
      <em className="italic">
        {children}
      </em>
    ),
    
    // Links
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
      >
        {children}
      </a>
    ),
    
    // Código inline
    code: ({ children }) => (
      <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),

    // Destaque/highlight
    highlight: ({ children }) => (
      <mark className="bg-yellow-200 px-1 py-0.5 rounded">
        {children}
      </mark>
    ),
  },
}

// Função utilitária para criar slugs dos títulos
function slugify(children: any): string {
  if (!children) return ''
  
  const text = children
    .map((child: any) => (typeof child === 'string' ? child : child.text || ''))
    .join('')
    
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplos
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
}

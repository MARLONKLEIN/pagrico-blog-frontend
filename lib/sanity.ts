// lib/sanity.ts

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Tipos TypeScript expandidos
export interface Author {
  _id: string
  name: string
  role?: string
  bio?: string
  expertise?: string[]
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  socialLinks?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  color: string
  icon?: string
  description?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  body?: any // Para conteúdo PortableText
  publishedAt: string
  readingTime?: number
  featured?: boolean
  status?: string
  seoTitle?: string
  metaDescription?: string
  focusKeyword?: string
  keywords?: string[]
  mainImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
    caption?: string
  }
  author?: Author
  categories?: Category[]
  tags?: string[]
  relatedPosts?: Post[]
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Builder para URLs de imagens
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Query para buscar todos os posts
const ALL_POSTS_QUERY = `*[_type == "post" && status == "published"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readingTime,
  featured,
  mainImage {
    asset-> { url },
    alt,
    caption
  },
  author-> {
    name,
    role,
    image {
      asset-> { url },
      alt
    }
  },
  categories[]-> {
    _id,
    title,
    slug,
    color,
    icon
  },
  tags
}`

// Query para buscar posts em destaque
const FEATURED_POSTS_QUERY = `*[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readingTime,
  mainImage {
    asset-> { url },
    alt,
    caption
  },
  author-> {
    name,
    role,
    image {
      asset-> { url },
      alt
    }
  },
  categories[]-> {
    _id,
    title,
    slug,
    color,
    icon
  },
  tags
}`

// Query para buscar um post específico pelo slug
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  readingTime,
  seoTitle,
  metaDescription,
  focusKeyword,
  keywords,
  mainImage {
    asset-> { url },
    alt,
    caption
  },
  author-> {
    name,
    role,
    bio,
    expertise,
    image {
      asset-> { url },
      alt
    },
    socialLinks
  },
  categories[]-> {
    _id,
    title,
    slug,
    color,
    icon
  },
  tags,
  relatedPosts[]-> {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    mainImage {
      asset-> { url },
      alt
    },
    author-> {
      name,
      image {
        asset-> { url },
        alt
      }
    },
    categories[]-> {
      _id,
      title,
      slug,
      color,
      icon
    }
  }
}`

// Query para buscar apenas os slugs dos posts (usado para generateStaticParams)
export const POST_SLUGS_QUERY = `*[_type == "post" && status == "published" && defined(slug.current)] {
  slug
}`

// Função para buscar todos os posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(ALL_POSTS_QUERY)
    return posts || []
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return []
  }
}

// Função para buscar post por slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })
    return post || null
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error)
    return null
  }
}

// Função para buscar posts em destaque
export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(FEATURED_POSTS_QUERY)
    return posts || []
  } catch (error) {
    console.error('Erro ao buscar posts em destaque:', error)
    return []
  }
}

// Função para buscar posts por categoria
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "post" && status == "published" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readingTime,
        mainImage {
          asset-> { url },
          alt,
          caption
        },
        author-> {
          name,
          role,
          image {
            asset-> { url },
            alt
          }
        },
        categories[]-> {
          _id,
          title,
          slug,
          color,
          icon
        },
        tags
      }
    `, { categorySlug })
    return posts || []
  } catch (error) {
    console.error('Erro ao buscar posts por categoria:', error)
    return []
  }
}

// Função para buscar todas as categorias
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch(`
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        color,
        icon,
        description
      }
    `)
    return categories || []
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}
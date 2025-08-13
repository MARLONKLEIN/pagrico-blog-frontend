import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableTextBlock } from '@portabletext/types'

// Configuração do cliente Sanity
export const client = createClient({
  projectId: '32ysp5d7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Para desenvolvimento local
})

// Builder para URLs de imagens
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Tipos TypeScript para nossos dados
export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
    caption?: string
  }
  body: PortableTextBlock[]
  author: Author
  categories: Category[]
  tags?: string[]
  publishedAt: string
  readingTime?: number
  featured: boolean
  status: 'draft' | 'review' | 'published' | 'archived'
  seoTitle?: string
  metaDescription: string
  focusKeyword: string
  keywords?: string[]
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  role: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
  }
  bio: string
  expertise: string[]
  active: boolean
  featured: boolean
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  color: string
  icon: string
  featured: boolean
}

// GROQ Queries otimizadas
export const POSTS_QUERY = `
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt,
      caption
    },
    author-> {
      name,
      role,
      image {
        asset,
        alt
      }
    },
    categories[]-> {
      title,
      slug,
      color,
      icon
    },
    publishedAt,
    readingTime,
    featured,
    metaDescription,
    focusKeyword
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt,
      caption
    },
    body,
    author-> {
      name,
      role,
      slug,
      image {
        asset,
        alt
      },
      bio,
      expertise,
      socialLinks
    },
    categories[]-> {
      title,
      slug,
      description,
      color,
      icon
    },
    tags,
    publishedAt,
    readingTime,
    featured,
    seoTitle,
    metaDescription,
    focusKeyword,
    keywords,
    relatedPosts[]-> {
      title,
      slug,
      excerpt,
      mainImage {
        asset,
        alt
      },
      publishedAt,
      readingTime
    }
  }
`

export const POST_SLUGS_QUERY = `
  *[_type == "post" && status == "published"] {
    slug {
      current
    }
  }
`

export const FEATURED_POSTS_QUERY = `
  *[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt
    },
    author-> {
      name,
      role
    },
    categories[]-> {
      title,
      color,
      icon
    },
    publishedAt,
    readingTime
  }
`

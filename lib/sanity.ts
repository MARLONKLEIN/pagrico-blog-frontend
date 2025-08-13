// lib/sanity.ts

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Tipos TypeScript
export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  publishedAt: string
  mainImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  author?: {
    name: string
  }
  categories?: Array<{
    title: string
  }>
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

// Função para buscar todos os posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    const query = `*[_type == "post" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
      },
      categories[]->{
        title
      }
    }`
    
    const posts = await client.fetch(query)
    return posts || []
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return []
  }
}

// Função para buscar post por slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const query = `*[_type == "post" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
      },
      categories[]->{
        title
      }
    }`
    
    const post = await client.fetch(query, { slug })
    return post || null
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error)
    return null
  }
}

// Função para buscar posts em destaque
export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const query = `*[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
      },
      categories[]->{
        title
      }
    }`
    
    const posts = await client.fetch(query)
    return posts || []
  } catch (error) {
    console.error('Erro ao buscar posts em destaque:', error)
    return []
  }
}
# 🔌 PagRico Blog Integration API

> Documentação técnica completa para integrar o blog PagRico no site principal

## 📋 Visão Geral

Esta API permite integrar facilmente os artigos do blog PagRico (gerenciados via Sanity.io) em qualquer página do site principal `pagrico.com`. Oferecemos múltiplas formas de integração, desde a mais simples (plug-and-play) até soluções customizadas avançadas.

## 🎯 Configuração do Sanity

### Credenciais de Acesso
```javascript
const SANITY_CONFIG = {
  projectId: '32ysp5d7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
}
```

### URL Base da API
```
https://32ysp5d7.api.sanity.io/v2024-01-01/data/query/production
```

## 🚀 Métodos de Integração

### 1. 📦 Script Plug-and-Play (Mais Simples)

**Arquivo**: `pagrico-blog-integration.js`  
**Tamanho**: ~15KB (minificado)  
**Dependências**: Nenhuma

#### Implementação:
```html
<!-- 1. Incluir o script -->
<script src="https://blog.pagrico.com/pagrico-blog-integration.js"></script>

<!-- 2. Container para o blog -->
<div id="meu-blog"></div>

<!-- 3. Inicializar -->
<script>
  PagRicoBlog.renderSection('meu-blog', {
    limit: 3,
    featured: true,
    showHeader: true,
    showCTA: true
  })
</script>
```

#### Opções de Configuração:
```javascript
{
  limit: 3,              // Número de posts (padrão: 3)
  featured: false,       // Apenas posts em destaque (padrão: false)
  category: null,        // Filtrar por categoria (padrão: null)
  showHeader: true,      // Exibir título da seção (padrão: true)
  showCTA: true,         // Exibir botão "Ver mais" (padrão: true)
  title: 'Blog PagRico', // Título personalizado
  subtitle: 'Insights...', // Subtítulo personalizado
  layout: 'grid'         // Layout: 'grid' ou 'list' (padrão: 'grid')
}
```

### 2. ⚡ API JavaScript Direta

#### Buscar Todos os Posts:
```javascript
// Buscar posts com opções
const posts = await PagRicoBlog.getPosts({ 
  limit: 10 
})

console.log('Posts encontrados:', posts)
```

#### Buscar Posts em Destaque:
```javascript
// Apenas posts marcados como "featured"
const featuredPosts = await PagRicoBlog.getFeaturedPosts({ 
  limit: 3 
})

console.log('Posts em destaque:', featuredPosts)
```

#### Buscar por Categoria:
```javascript
// Posts sobre stablecoins
const stablecoinPosts = await PagRicoBlog.getPostsByCategory('stablecoins', { 
  limit: 5 
})

// Posts sobre PIX Internacional
const pixPosts = await PagRicoBlog.getPostsByCategory('pix-internacional', { 
  limit: 5 
})
```

#### Renderização Customizada:
```javascript
// Buscar posts e renderizar customizado
PagRicoBlog.getPosts({ limit: 5 }).then(posts => {
  const container = document.getElementById('meus-posts')
  
  const html = posts.map(post => `
    <article class="meu-card-customizado">
      <img src="${PagRicoBlog.optimizeImage(post.mainImage?.asset?.url, {width: 300, height: 200})}" 
           alt="${post.mainImage?.alt}">
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <time>${PagRicoBlog.formatDate(post.publishedAt)}</time>
      <a href="https://blog.pagrico.com/blog/${post.slug.current}">Ler mais</a>
    </article>
  `).join('')
  
  container.innerHTML = html
})
```

### 3. 🔧 Cliente Sanity Direto (Para React/Next.js)

#### Instalação:
```bash
npm install @sanity/client
```

#### Configuração:
```javascript
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: '32ysp5d7',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

// Buscar posts
export async function getBlogPosts(limit = 10) {
  return await sanityClient.fetch(`
    *[_type == "post" && status == "published"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readingTime,
      featured,
      mainImage {
        asset-> {
          _id,
          url
        },
        alt
      },
      categories[]-> {
        title,
        slug,
        icon,
        color
      },
      author-> {
        name,
        role
      }
    }
  `)
}
```

## 📊 Estrutura dos Dados

### Objeto Post:
```javascript
{
  _id: "string",
  title: "string",
  slug: { current: "string" },
  excerpt: "string",
  publishedAt: "2024-01-15T10:00:00.000Z",
  readingTime: 5,
  featured: true,
  mainImage: {
    asset: {
      _id: "string",
      url: "https://cdn.sanity.io/images/..."
    },
    alt: "string"
  },
  categories: [
    {
      title: "Stablecoins",
      slug: { current: "stablecoins" },
      icon: "🪙",
      color: "#00ffaa"
    }
  ],
  author: {
    name: "João Silva",
    role: "CEO & Fundador"
  }
}
```

### Categorias Disponíveis:
- `tokenizacao` - Tokenização
- `drex-e-real-digital` - Drex e Real Digital
- `credito-imobiliario` - Crédito Imobiliário
- `pagamentos-internacionais` - Pagamentos Internacionais
- `cripto-para-empresas` - Cripto para Empresas
- `stablecoins` - Stablecoins
- `pix-internacional` - PIX Internacional
- `cambio-digital` - Câmbio Digital
- `blockchain-b2b` - Blockchain B2B
- `fintechs-brasil` - Fintechs Brasil

## 🎨 Customização Visual

### CSS Classes Disponíveis:
```css
.pagrico-blog-section        /* Container principal */
.pagrico-blog-header         /* Cabeçalho da seção */
.pagrico-blog-title          /* Título da seção */
.pagrico-blog-subtitle       /* Subtítulo da seção */
.pagrico-posts-grid          /* Grid de posts */
.pagrico-posts-list          /* Lista de posts */
.pagrico-post-card           /* Card individual */
.pagrico-post-card.featured  /* Card em destaque */
.pagrico-post-image          /* Container da imagem */
.pagrico-post-category       /* Badge da categoria */
.pagrico-post-content        /* Conteúdo do card */
.pagrico-post-title          /* Título do post */
.pagrico-post-excerpt        /* Resumo do post */
.pagrico-post-meta           /* Metadados (data, autor, etc) */
.pagrico-post-link           /* Link "Ler mais" */
.pagrico-blog-cta            /* Container do CTA */
.pagrico-cta-button          /* Botão "Ver todos" */
```

### Cores PagRico:
```css
:root {
  --pagrico-blue: #00033D;
  --pagrico-green: #00ffaa;
}
```

### Sobrescrever Estilos:
```css
/* Customizar cores */
.pagrico-post-title a {
  color: #your-color !important;
}

.pagrico-post-category {
  background: #your-color !important;
  color: #your-text-color !important;
}

/* Customizar layout */
.pagrico-posts-grid {
  grid-template-columns: repeat(4, 1fr) !important;
}
```

## 🔧 Utilitários Disponíveis

### Formatação de Data:
```javascript
const formattedDate = PagRicoBlog.formatDate('2024-01-15T10:00:00.000Z')
// Retorna: "15 de janeiro de 2024"
```

### Otimização de Imagens:
```javascript
const optimizedUrl = PagRicoBlog.optimizeImage(
  'https://cdn.sanity.io/images/32ysp5d7/production/image.jpg',
  {
    width: 400,
    height: 300,
    fit: 'crop',
    quality: 80,
    auto: 'format'
  }
)
// Retorna: URL otimizada com parâmetros Sanity
```

## 📈 Performance e Cache

### Estratégias de Cache:
- **CDN**: Sanity CDN ativo para imagens
- **Browser Cache**: Headers apropriados para JS/CSS
- **API Cache**: Respostas cacheadas por 5 minutos

### Otimizações:
- **Lazy Loading**: Imagens carregadas sob demanda
- **Async Loading**: Scripts não bloqueiam renderização
- **Minificação**: JS/CSS otimizados para produção
- **Gzip**: Compressão automática de assets

## 🚨 Tratamento de Erros

### Estados de Loading:
```javascript
// Personalizar loading
PagRicoBlog.renderSection('container', {
  limit: 3,
  onLoading: () => {
    console.log('Carregando posts...')
  },
  onError: (error) => {
    console.error('Erro ao carregar:', error)
  },
  onSuccess: (posts) => {
    console.log('Posts carregados:', posts.length)
  }
})
```

### Fallback Manual:
```javascript
try {
  const posts = await PagRicoBlog.getPosts({ limit: 3 })
  // Renderizar posts
} catch (error) {
  // Mostrar conteúdo alternativo
  document.getElementById('blog').innerHTML = `
    <div class="blog-error">
      <h3>Blog temporariamente indisponível</h3>
      <p>Tente novamente em alguns minutos</p>
      <a href="https://blog.pagrico.com">Visitar blog diretamente</a>
    </div>
  `
}
```

## 🔒 Segurança e Rate Limiting

### Rate Limits:
- **Requests**: 1000/hora por IP
- **Burst**: 10 requests/segundo
- **Timeout**: 30 segundos por request

### Headers CORS:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Content-Type
```

## 🧪 Teste e Debug

### Teste de Conectividade:
```javascript
// Verificar se a API está funcionando
PagRicoBlog.getPosts({ limit: 1 })
  .then(posts => {
    console.log('✅ API funcionando:', posts.length > 0)
    console.log('📊 Configuração:', PagRicoBlog.config)
  })
  .catch(error => {
    console.error('❌ Erro na API:', error)
  })
```

### Debug Mode:
```javascript
// Ativar logs detalhados (apenas desenvolvimento)
window.PAGRICO_DEBUG = true

// Agora todas as operações mostrarão logs
PagRicoBlog.getPosts({ limit: 3 })
```

### Validação de Posts:
```javascript
// Verificar estrutura dos posts
PagRicoBlog.getPosts({ limit: 1 }).then(posts => {
  const post = posts[0]
  
  const validation = {
    hasTitle: !!post.title,
    hasSlug: !!post.slug?.current,
    hasExcerpt: !!post.excerpt,
    hasImage: !!post.mainImage?.asset?.url,
    hasCategory: !!post.categories?.length,
    hasAuthor: !!post.author?.name
  }
  
  console.log('📋 Validação do post:', validation)
})
```

## 📞 Suporte Técnico

### Contato:
- **Email**: tech@pagrico.com
- **GitHub Issues**: [pagrico-blog-frontend/issues](https://github.com/MARLONKLEIN/pagrico-blog-frontend/issues)
- **Documentação**: https://blog.pagrico.com/docs

### Troubleshooting Comum:

**❌ "Posts não aparecem"**
- Verificar se há posts publicados no Sanity
- Validar connection com a API
- Checar console para erros JavaScript

**❌ "Imagens não carregam"**
- Validar URLs das imagens no Sanity
- Verificar CORS headers
- Testar URLs de imagem diretamente

**❌ "Estilos não aplicam"**
- Verificar se CSS foi injetado
- Confirmar IDs de containers únicos
- Testar especificidade CSS

---

## ✨ Exemplos Práticos

### Exemplo 1: Seção Homepage
```html
<!-- Na homepage do pagrico.com -->
<section class="blog-section">
  <div id="homepage-blog"></div>
</section>

<script>
  PagRicoBlog.renderSection('homepage-blog', {
    limit: 3,
    featured: true,
    title: '📖 Últimas do Blog',
    subtitle: 'Fique por dentro das novidades em fintech'
  })
</script>
```

### Exemplo 2: Página de Stablecoins
```html
<!-- Em uma landing page sobre stablecoins -->
<div id="stablecoins-content"></div>

<script>
  PagRicoBlog.renderSection('stablecoins-content', {
    category: 'stablecoins',
    limit: 4,
    title: '🪙 Tudo sobre Stablecoins',
    subtitle: 'Artigos especializados sobre moedas digitais estáveis',
    layout: 'list'
  })
</script>
```

### Exemplo 3: Widget Lateral
```html
<!-- Widget lateral com posts recentes -->
<aside class="blog-widget">
  <div id="recent-posts"></div>
</aside>

<script>
  PagRicoBlog.getPosts({ limit: 3 }).then(posts => {
    const html = `
      <h3>📰 Posts Recentes</h3>
      <ul>
        ${posts.map(post => `
          <li>
            <a href="https://blog.pagrico.com/blog/${post.slug.current}">
              ${post.title}
            </a>
            <time>${PagRicoBlog.formatDate(post.publishedAt)}</time>
          </li>
        `).join('')}
      </ul>
      <a href="https://blog.pagrico.com" class="view-all">Ver todos →</a>
    `
    
    document.getElementById('recent-posts').innerHTML = html
  })
</script>
```

---

📅 **Última Atualização**: 14 de agosto de 2025  
📋 **Versão da API**: v2024-01-01  
🔧 **Status**: Estável e em produção

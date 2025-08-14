/**
 * PagRico Blog Integration - Cliente JavaScript Simples
 * 
 * Este arquivo permite integrar facilmente os artigos do blog PagRico
 * em qualquer site HTML/JavaScript, sem necessidade de instalar dependências.
 * 
 * Como usar:
 * 1. Incluir este script no seu site
 * 2. Chamar PagRicoBlog.getPosts() para buscar artigos
 * 3. Usar PagRicoBlog.renderSection() para criar uma seção automaticamente
 * 
 * Exemplo:
 * <script src="pagrico-blog-integration.js"></script>
 * <script>
 *   PagRicoBlog.renderSection('blog-container', { limit: 3, featured: true })
 * </script>
 */

window.PagRicoBlog = (function() {
  'use strict';
  
  // Configuração da API Sanity
  const SANITY_CONFIG = {
    projectId: '32ysp5d7',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true
  };
  
  const BASE_URL = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}`;
  
  // Queries GROQ otimizadas
  const QUERIES = {
    // Posts publicados ordenados por data
    allPosts: `
      *[_type == "post" && status == "published"] | order(publishedAt desc) {
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
          role,
          image {
            asset-> {
              url
            }
          }
        }
      }
    `,
    
    // Apenas posts em destaque
    featuredPosts: `
      *[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readingTime,
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
    `,
    
    // Posts de uma categoria específica
    postsByCategory: (categorySlug) => `
      *[_type == "post" && status == "published" && references(*[_type == "category" && slug.current == "${categorySlug}"]._id)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readingTime,
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
    `
  };
  
  /**
   * Executa uma query GROQ na API do Sanity
   * @param {string} query - Query GROQ
   * @returns {Promise<Array>} - Array de posts
   */
  async function executeQuery(query) {
    try {
      const url = `${BASE_URL}?query=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Erro ao buscar posts do Sanity:', error);
      throw error;
    }
  }
  
  /**
   * Busca todos os posts publicados
   * @param {Object} options - Opções de busca
   * @param {number} options.limit - Limite de posts (padrão: 10)
   * @returns {Promise<Array>} - Array de posts
   */
  async function getAllPosts(options = {}) {
    const { limit = 10 } = options;
    const query = limit > 0 ? `${QUERIES.allPosts}[0...${limit}]` : QUERIES.allPosts;
    return await executeQuery(query);
  }
  
  /**
   * Busca apenas posts em destaque
   * @param {Object} options - Opções de busca
   * @param {number} options.limit - Limite de posts (padrão: 3)
   * @returns {Promise<Array>} - Array de posts em destaque
   */
  async function getFeaturedPosts(options = {}) {
    const { limit = 3 } = options;
    const query = limit > 0 ? `${QUERIES.featuredPosts}[0...${limit}]` : QUERIES.featuredPosts;
    return await executeQuery(query);
  }
  
  /**
   * Busca posts de uma categoria específica
   * @param {string} categorySlug - Slug da categoria
   * @param {Object} options - Opções de busca
   * @param {number} options.limit - Limite de posts (padrão: 10)
   * @returns {Promise<Array>} - Array de posts da categoria
   */
  async function getPostsByCategory(categorySlug, options = {}) {
    const { limit = 10 } = options;
    const query = limit > 0 ? 
      `${QUERIES.postsByCategory(categorySlug)}[0...${limit}]` : 
      QUERIES.postsByCategory(categorySlug);
    return await executeQuery(query);
  }
  
  /**
   * Formatar data para exibição
   * @param {string} dateString - Data em formato ISO
   * @returns {string} - Data formatada em português
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  /**
   * Gerar URL da imagem otimizada do Sanity
   * @param {string} imageUrl - URL original da imagem
   * @param {Object} options - Opções de otimização
   * @returns {string} - URL da imagem otimizada
   */
  function optimizeImage(imageUrl, options = {}) {
    if (!imageUrl) return '';
    
    const {
      width = 400,
      height = 250,
      fit = 'crop',
      auto = 'format',
      quality = 80
    } = options;
    
    return `${imageUrl}?w=${width}&h=${height}&fit=${fit}&auto=${auto}&q=${quality}`;
  }
  
  /**
   * Renderizar um card de post
   * @param {Object} post - Dados do post
   * @param {string} variant - Variante do card ('default' ou 'featured')
   * @returns {string} - HTML do card
   */
  function renderPostCard(post, variant = 'default') {
    const publishedDate = formatDate(post.publishedAt);
    const category = post.categories && post.categories[0];
    const imageUrl = post.mainImage?.asset?.url;
    const optimizedImage = imageUrl ? optimizeImage(imageUrl) : '';
    
    const cardClass = variant === 'featured' ? 'pagrico-post-card featured' : 'pagrico-post-card';
    
    return `
      <article class="${cardClass}">
        ${optimizedImage ? `
          <div class="pagrico-post-image">
            <img src="${optimizedImage}" 
                 alt="${post.mainImage?.alt || post.title}" 
                 loading="lazy">
            ${category ? `
              <span class="pagrico-post-category" style="background-color: ${category.color || '#00ffaa'}">
                ${category.icon || '📄'} ${category.title}
              </span>
            ` : ''}
          </div>
        ` : ''}
        
        <div class="pagrico-post-content">
          <h3 class="pagrico-post-title">
            <a href="https://blog.pagrico.com/blog/${post.slug.current}" target="_blank" rel="noopener noreferrer">
              ${post.title}
            </a>
          </h3>
          
          ${post.excerpt ? `
            <p class="pagrico-post-excerpt">${post.excerpt}</p>
          ` : ''}
          
          <div class="pagrico-post-meta">
            <span class="pagrico-post-date">${publishedDate}</span>
            ${post.readingTime ? `
              <span class="pagrico-post-reading-time">${post.readingTime} min de leitura</span>
            ` : ''}
            ${post.author?.name ? `
              <span class="pagrico-post-author">Por ${post.author.name}</span>
            ` : ''}
          </div>
          
          <a href="https://blog.pagrico.com/blog/${post.slug.current}" 
             class="pagrico-post-link" 
             target="_blank" 
             rel="noopener noreferrer">
            Ler artigo completo →
          </a>
        </div>
      </article>
    `;
  }
  
  /**
   * Renderizar seção completa do blog
   * @param {string} containerId - ID do container HTML
   * @param {Object} options - Opções de renderização
   * @returns {Promise<void>}
   */
  async function renderBlogSection(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container com ID '${containerId}' não encontrado`);
      return;
    }
    
    // Opções padrão
    const {
      limit = 3,
      featured = false,
      category = null,
      showHeader = true,
      showCTA = true,
      title = '📖 Blog PagRico',
      subtitle = 'Insights sobre pagamentos internacionais e fintech',
      layout = 'grid' // 'grid' ou 'list'
    } = options;
    
    // Mostrar loading
    container.innerHTML = `
      <div class="pagrico-blog-loading">
        <div class="pagrico-loading-spinner"></div>
        <p>Carregando artigos...</p>
      </div>
    `;
    
    try {
      // Buscar posts baseado nas opções
      let posts;
      if (category) {
        posts = await getPostsByCategory(category, { limit });
      } else if (featured) {
        posts = await getFeaturedPosts({ limit });
      } else {
        posts = await getAllPosts({ limit });
      }
      
      // Renderizar seção
      let html = '<div class="pagrico-blog-section">';
      
      // Header da seção
      if (showHeader) {
        html += `
          <div class="pagrico-blog-header">
            <h2 class="pagrico-blog-title">${title}</h2>
            <p class="pagrico-blog-subtitle">${subtitle}</p>
          </div>
        `;
      }
      
      // Grid de posts
      if (posts.length > 0) {
        const layoutClass = layout === 'list' ? 'pagrico-posts-list' : 'pagrico-posts-grid';
        html += `<div class="${layoutClass}">`;
        
        posts.forEach(post => {
          html += renderPostCard(post, featured ? 'featured' : 'default');
        });
        
        html += '</div>';
        
        // CTA para ver mais
        if (showCTA) {
          html += `
            <div class="pagrico-blog-cta">
              <a href="https://blog.pagrico.com" 
                 class="pagrico-cta-button" 
                 target="_blank" 
                 rel="noopener noreferrer">
                📚 Ver todos os artigos
              </a>
            </div>
          `;
        }
      } else {
        html += `
          <div class="pagrico-blog-empty">
            <div class="pagrico-empty-icon">📝</div>
            <h3>Nenhum artigo encontrado</h3>
            <p>Estamos trabalhando em novos conteúdos incríveis para você!</p>
          </div>
        `;
      }
      
      html += '</div>';
      
      // Injetar CSS se ainda não foi injetado
      if (!document.querySelector('#pagrico-blog-styles')) {
        injectStyles();
      }
      
      container.innerHTML = html;
      
    } catch (error) {
      console.error('Erro ao renderizar seção do blog:', error);
      container.innerHTML = `
        <div class="pagrico-blog-error">
          <div class="pagrico-error-icon">❌</div>
          <h3>Erro ao carregar artigos</h3>
          <p>Não foi possível carregar os artigos do blog. Tente novamente mais tarde.</p>
          <a href="https://blog.pagrico.com" target="_blank" rel="noopener noreferrer" class="pagrico-error-link">
            Visitar blog diretamente
          </a>
        </div>
      `;
    }
  }
  
  /**
   * Injetar estilos CSS na página
   */
  function injectStyles() {
    if (document.querySelector('#pagrico-blog-styles')) return;
    
    const styles = `
      <style id="pagrico-blog-styles">
        /* PagRico Blog Integration Styles */
        .pagrico-blog-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .pagrico-blog-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .pagrico-blog-title {
          color: #00033D;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        
        .pagrico-blog-subtitle {
          color: #64748b;
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .pagrico-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }
        
        .pagrico-posts-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 40px;
        }
        
        .pagrico-post-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }
        
        .pagrico-post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .pagrico-post-card.featured {
          border: 2px solid #00ffaa;
        }
        
        .pagrico-post-image {
          position: relative;
        }
        
        .pagrico-post-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }
        
        .pagrico-post-category {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #00ffaa;
          color: #00033D;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .pagrico-post-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .pagrico-post-title {
          margin: 0 0 12px 0;
          font-size: 1.25rem;
          line-height: 1.4;
        }
        
        .pagrico-post-title a {
          color: #00033D;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.3s ease;
        }
        
        .pagrico-post-title a:hover {
          color: #00ffaa;
        }
        
        .pagrico-post-excerpt {
          color: #64748b;
          font-size: 0.975rem;
          line-height: 1.6;
          margin: 0 0 16px 0;
          flex: 1;
        }
        
        .pagrico-post-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.875rem;
          color: #94a3b8;
          margin-bottom: 16px;
        }
        
        .pagrico-post-link {
          color: #00033D;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          margin-top: auto;
        }
        
        .pagrico-post-link:hover {
          color: #00ffaa;
          transform: translateX(4px);
        }
        
        .pagrico-blog-cta {
          text-align: center;
          padding-top: 20px;
        }
        
        .pagrico-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #00033D;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .pagrico-cta-button:hover {
          background: #00ffaa;
          color: #00033D;
          transform: translateY(-2px);
        }
        
        .pagrico-blog-loading,
        .pagrico-blog-error,
        .pagrico-blog-empty {
          text-align: center;
          padding: 60px 20px;
          border-radius: 12px;
          margin: 20px 0;
        }
        
        .pagrico-blog-loading {
          color: #64748b;
          background: #f8fafc;
        }
        
        .pagrico-loading-spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 20px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #00033D;
          border-radius: 50%;
          animation: pagrico-spin 1s linear infinite;
        }
        
        @keyframes pagrico-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .pagrico-blog-error {
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
        }
        
        .pagrico-blog-empty {
          color: #64748b;
          background: #f8fafc;
        }
        
        .pagrico-empty-icon,
        .pagrico-error-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        
        .pagrico-error-link {
          color: #00033D;
          text-decoration: none;
          font-weight: 600;
        }
        
        .pagrico-error-link:hover {
          color: #00ffaa;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .pagrico-blog-title {
            font-size: 2rem;
          }
          
          .pagrico-posts-grid {
            grid-template-columns: 1fr;
          }
          
          .pagrico-post-meta {
            flex-direction: column;
            gap: 8px;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }
  
  // API pública
  return {
    // Métodos de busca
    getPosts: getAllPosts,
    getFeaturedPosts: getFeaturedPosts,
    getPostsByCategory: getPostsByCategory,
    
    // Métodos de renderização
    renderSection: renderBlogSection,
    renderCard: renderPostCard,
    
    // Utilitários
    formatDate: formatDate,
    optimizeImage: optimizeImage,
    
    // Configuração
    config: SANITY_CONFIG
  };
})();

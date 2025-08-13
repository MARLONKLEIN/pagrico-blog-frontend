// Teste rápido da conexão Sanity
const { client } = require('./lib/sanity.ts')

async function testSanityConnection() {
  try {
    console.log('🔌 Testando conexão com Sanity...')
    
    // Teste básico de conectividade
    const result = await client.fetch('*[_type == "post"] | order(_createdAt desc) [0..2] { title, slug, _createdAt }')
    
    console.log('✅ Conexão com Sanity funcionando!')
    console.log(`📊 Total de posts encontrados: ${result.length}`)
    
    if (result.length > 0) {
      console.log('📝 Últimos posts:')
      result.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title || 'Sem título'} (${post.slug?.current || 'sem-slug'})`)
      })
    } else {
      console.log('📝 Nenhum post encontrado. Crie alguns posts no Sanity Studio!')
    }
    
    // Teste de categorias
    const categories = await client.fetch('*[_type == "category"] | order(title asc) { title, slug }')
    console.log(`📂 Total de categorias encontradas: ${categories.length}`)
    
    if (categories.length > 0) {
      console.log('📂 Categorias disponíveis:')
      categories.forEach((cat, index) => {
        console.log(`   ${index + 1}. ${cat.title} (${cat.slug?.current})`)
      })
    }
    
    // Teste de autores
    const authors = await client.fetch('*[_type == "author"] | order(name asc) { name, role }')
    console.log(`👤 Total de autores encontrados: ${authors.length}`)
    
    if (authors.length > 0) {
      console.log('👤 Autores disponíveis:')
      authors.forEach((author, index) => {
        console.log(`   ${index + 1}. ${author.name} - ${author.role}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Erro na conexão com Sanity:')
    console.error('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '32ysp5d7')
    console.error('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
    console.error('Erro detalhado:', error.message)
    
    if (error.message.includes('Unauthorized')) {
      console.log('💡 Dica: Verifique se o Project ID e Dataset estão corretos no arquivo .env.local')
    }
  }
}

testSanityConnection()

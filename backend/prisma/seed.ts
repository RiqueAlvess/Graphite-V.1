import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create demo user
  const demoPasswordHash = await bcrypt.hash('demo123', 10)

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@vegaeditor.com' },
    update: {},
    create: {
      email: 'demo@vegaeditor.com',
      name: 'Demo User',
      passwordHash: demoPasswordHash,
      subscriptionPlan: 'free',
    },
  })

  console.log('✅ Demo user created:', demoUser.email)

  // Create premium demo user
  const premiumPasswordHash = await bcrypt.hash('premium123', 10)

  const premiumUser = await prisma.user.upsert({
    where: { email: 'premium@vegaeditor.com' },
    update: {},
    create: {
      email: 'premium@vegaeditor.com',
      name: 'Premium User',
      passwordHash: premiumPasswordHash,
      subscriptionPlan: 'premium',
    },
  })

  console.log('✅ Premium user created:', premiumUser.email)

  // Create sample charts for demo user
  const sampleBarChart = await prisma.visualConfig.create({
    data: {
      name: 'Vendas por Categoria',
      description: 'Gráfico de barras verticais mostrando vendas',
      chartType: 'bar',
      userId: demoUser.id,
      vegaSpec: {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: { name: 'dataset' },
        mark: {
          type: 'bar',
          tooltip: true,
          color: '#7C3AED',
        },
        encoding: {
          x: { field: 'categoria', type: 'nominal', axis: { title: 'Categoria' } },
          y: { field: 'vendas', type: 'quantitative', axis: { title: 'Vendas (R$)' } },
        },
        config: {
          background: '#121826',
          view: { stroke: null },
        },
      },
    },
  })

  console.log('✅ Sample chart created:', sampleBarChart.name)

  // Create gallery templates
  const template1 = await prisma.visualConfig.create({
    data: {
      name: 'Template: Linha Temporal',
      description: 'Template de linha para séries temporais',
      chartType: 'line',
      userId: premiumUser.id,
      isPublic: true,
      publishedToGallery: true,
      vegaSpec: {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: { name: 'dataset' },
        mark: {
          type: 'line',
          point: true,
          tooltip: true,
          color: '#3B82F6',
        },
        encoding: {
          x: { field: 'data', type: 'temporal', axis: { title: 'Data' } },
          y: { field: 'valor', type: 'quantitative', axis: { title: 'Valor' } },
        },
        config: {
          background: '#121826',
          view: { stroke: null },
        },
      },
    },
  })

  await prisma.galleryItem.create({
    data: {
      title: 'Linha Temporal - Template',
      description: 'Template profissional para visualizar séries temporais',
      category: 'template',
      tags: ['temporal', 'linha', 'tendência'],
      visualConfigId: template1.id,
      creatorId: premiumUser.id,
      viewCount: 42,
      useCount: 15,
    },
  })

  console.log('✅ Gallery template created')

  const template2 = await prisma.visualConfig.create({
    data: {
      name: 'Template: Scatter Plot',
      description: 'Template para correlação entre variáveis',
      chartType: 'point',
      userId: premiumUser.id,
      isPublic: true,
      publishedToGallery: true,
      vegaSpec: {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: { name: 'dataset' },
        mark: {
          type: 'point',
          tooltip: true,
          filled: true,
          size: 100,
        },
        encoding: {
          x: { field: 'x', type: 'quantitative', axis: { title: 'Variável X' } },
          y: { field: 'y', type: 'quantitative', axis: { title: 'Variável Y' } },
          color: { field: 'categoria', type: 'nominal' },
        },
        config: {
          background: '#121826',
          view: { stroke: null },
        },
      },
    },
  })

  await prisma.galleryItem.create({
    data: {
      title: 'Scatter Plot - Template',
      description: 'Visualize correlações e padrões em seus dados',
      category: 'template',
      tags: ['scatter', 'correlação', 'análise'],
      visualConfigId: template2.id,
      creatorId: premiumUser.id,
      viewCount: 28,
      useCount: 8,
    },
  })

  console.log('✅ Second gallery template created')

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📝 Demo accounts:')
  console.log('   Free: demo@vegaeditor.com / demo123')
  console.log('   Premium: premium@vegaeditor.com / premium123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// scripts/delete-all-testimonials.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🗑️  Eliminando todos los testimonios...')

  const result = await prisma.testimonial.deleteMany({})

  console.log(`✅ ${result.count} testimonios eliminados exitosamente`)
  console.log('💝 Ahora puedes empezar con testimonios reales de tus clientas')
}

main()
  .catch((e) => {
    console.error('❌ Error eliminando testimonios:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Tus productos actuales (ya los tienes, no los toco)

  // === AÑADIMOS TESTIMONIOS REALES ===
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Laura Martínez",
        message: "La mochila quedó hermosa, se nota que está hecha con amor y paciencia. ¡La uso todos los días!",
        rating: 5,
      },
      {
        name: "Natalia Ramírez",
        message: "Excelente calidad, los colores quedaron tal cual los quería. Carmen es súper atenta.",
        rating: 5,
      },
      {
        name: "Diana Pérez",
        message: "La paciencia para escuchar lo que quería fue increíble. ¡La recomiendo 100%!",
        rating: 5,
      },
      {
        name: "Valeria Gómez",
        message: "Mi mochila es única, todos me preguntan dónde la compré. ¡Gracias Carmen!",
        rating: 5,
      },
      {
        name: "Camila Rojas",
        message: "El detalle y el amor puesto en cada puntada es increíble. ¡Volveré a pedir otra!",
        rating: 5,
      },
    ],
    skipDuplicates: true,
  })

  console.log('Testimonios reales creados!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
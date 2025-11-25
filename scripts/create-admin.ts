import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Datos de Carmen - CAMBIA AQUÍ SI QUIERES OTRA CONTRASEÑA
    const email = 'mimicrochet06@gmail.com';
    const password = 'MimiCrochet2024';  // ← CAMBIA ESTO SI QUIERES
    const name = 'Carmen';

    // Verificar si ya existe
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('❌ El admin ya existe');
      console.log('📧 Email:', email);
      console.log('💡 Si quieres cambiar la contraseña, borra el usuario primero');
      return;
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 12);

    // Crear admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'admin',
      },
    });

    console.log('✅ Admin creado exitosamente:');
    console.log('📧 Email:', email);
    console.log('🔑 Contraseña:', password);
    console.log('');
    console.log('🚀 Ahora puedes entrar en:');
    console.log('   http://localhost:3000/admin/login');
  } catch (error) {
    console.error('❌ Error al crear admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
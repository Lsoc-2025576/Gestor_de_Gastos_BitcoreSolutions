import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:TU_CONTRASEÑA@localhost:5432/gestor_gastos_db?schema=public";

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export const testDbConnection = async () => {
  try {
    await prisma.$connect();
    console.log(' Conexión a la base de datos con Prisma exitosa');
  } catch (error) {
    console.error(' Error al conectar a la base de datos:', error);
  }
};
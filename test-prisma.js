import "dotenv/config";
import { PrismaClient } from '@prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

async function test() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  
  try {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    
    console.log('PrismaClient instantiated with adapter successfully');
    // await prisma.$connect();
    // console.log('PrismaClient connected successfully');
  } catch (err) {
    console.error('Error instantiating PrismaClient with adapter:', err);
  }
}

test();

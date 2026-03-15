import 'dotenv/config';
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    
    // Parse the connection string to ensure all parts are explicitly passed to pg.Pool
    // This helps avoid issues where the connectionString parser might fail
    const dbUrl = new URL(url);
    const pool = new pg.Pool({
      user: decodeURIComponent(dbUrl.username),
      password: decodeURIComponent(dbUrl.password),
      host: dbUrl.hostname,
      port: parseInt(dbUrl.port || '5432'),
      database: decodeURIComponent(dbUrl.pathname.substring(1)),
      ssl: url.includes('sslmode=require') ? true : false,
    });

    console.log(`PrismaService: Initialized pool for ${dbUrl.hostname}:${dbUrl.port || '5432'}`);
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    // In some environments, $connect is not needed with adapters, but calling it doesn't hurt
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // In Prisma 7 with adapters, $on hooks may behave differently. 
    // We'll rely on NestJS lifecycle for now.
  }
}

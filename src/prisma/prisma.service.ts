import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
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

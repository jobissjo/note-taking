import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { WorkspaceModule } from './workspace/workspace.module.js';
import { NotebookModule } from './notebook/notebook.module.js';
import { NotesModule } from './notes/notes.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { DiaryModule } from './diary/diary.module.js';
import { DiaryEntryModule } from './diary-entry/diary-entry.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    WorkspaceModule,
    NotebookModule,
    NotesModule,
    DiaryModule,
    DiaryEntryModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

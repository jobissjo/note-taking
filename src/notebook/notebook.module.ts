import { Module } from '@nestjs/common';
import { NotebookService } from './notebook.service.js';
import { NotebookController } from './notebook.controller.js';
import { WorkspaceModule } from '../workspace/workspace.module.js';

@Module({
  imports: [WorkspaceModule],
  controllers: [NotebookController],
  providers: [NotebookService],
  exports: [NotebookService],
})
export class NotebookModule {}

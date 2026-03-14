import { Module } from '@nestjs/common';
import { NotesService } from './notes.service.js';
import { NotesController } from './notes.controller.js';
import { NotebookModule } from '../notebook/notebook.module.js';

@Module({
  imports: [NotebookModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}

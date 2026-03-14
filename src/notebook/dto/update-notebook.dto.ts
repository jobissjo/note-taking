import { PartialType } from '@nestjs/swagger';
import { CreateNotebookDto } from './create-notebook.dto.js';

export class UpdateNotebookDto extends PartialType(CreateNotebookDto) {}

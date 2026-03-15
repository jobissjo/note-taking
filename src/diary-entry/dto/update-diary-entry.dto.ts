import { PartialType } from '@nestjs/swagger';
import { CreateDiaryEntryDto } from './create-diary-entry.dto.js';

export class UpdateDiaryEntryDto extends PartialType(CreateDiaryEntryDto) {}

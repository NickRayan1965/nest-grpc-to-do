import { PartialType } from '@nestjs/swagger';
import { CreateTaskCategoryDto } from '../create/create-task-category.dto';

export class UpdateTaskCategoryDto extends PartialType(CreateTaskCategoryDto) {}

import { IPaginationDto } from '@app/common';
import BooleanString from '@app/common/interfaces/boolean-string.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsInt, IsOptional, Min } from 'class-validator';

export class GetUsersQueryDto implements IPaginationDto {
  @ApiPropertyOptional({
    title: 'Page number',
    default: process.env.PAGE,
    minimum: 1,
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    title: 'Page size',
    default: process.env.PAGE_SIZE,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  page_size?: number;

  @ApiPropertyOptional({
    title: 'Include relations',
    default: false,
  })
  @IsBooleanString()
  @IsOptional()
  relations?: BooleanString;
}

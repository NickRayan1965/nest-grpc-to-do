import { IPaginationResponse } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto implements IPaginationResponse {
  @ApiProperty({
    title: 'Total Count',
  })
  total_count: number;
}

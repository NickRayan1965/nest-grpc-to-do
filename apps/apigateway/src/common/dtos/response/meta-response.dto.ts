import { IMetaResponse } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class MetaResponseDto implements IMetaResponse {
  @ApiProperty({
    title: 'Status Code',
  })
  statusCode: number;
  @ApiProperty({
    title: 'Status Message',
  })
  message: string;

  @ApiProperty({
    title: 'Error Details',
    type: String || [String],
  })
  errors?: any;
}

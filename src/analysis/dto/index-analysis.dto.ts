import { ApiProperty } from '@nestjs/swagger';

export class StackDataDto {
  @ApiProperty({ description: '기술스택 ID' })
  stackId: number;

  @ApiProperty({ description: '기술스택 이름' })
  stackName: string;

  @ApiProperty({ description: '해당 기술스택의 개수' })
  count: number;
}

export class TechStackAnalysisDto {
  @ApiProperty({
    type: [StackDataDto],
    description: '공급: 유저들이 보유한 기술스택',
  })
  supply: StackDataDto[];

  @ApiProperty({
    type: [StackDataDto],
    description: '수요: 게시글에서 요구하는 기술스택',
  })
  demand: StackDataDto[];
}

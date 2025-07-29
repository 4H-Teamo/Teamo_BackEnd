import {
  IsString,
  IsInt,
  IsArray,
  IsDateString,
  IsPositive,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  DateValidationMessage,
  IntArrayValidationMessage,
  IntValidationMessage,
  MaxIntValidationMessage,
  PositiveIntValidationMessage,
  StringValidationMessage,
  WorkModeValidationMessage,
} from '../../shared/validators/messages/validation.messages';
import {
  LastPositionId,
  LastStackId,
} from '../../shared/validators/values/validation.values';

export class PostsUpdateDto {
  @ApiPropertyOptional({
    example: '프로젝트 모집 플랫폼 프로젝트 인원 모집',
    description: '게시글 제목',
  })
  @IsString({ message: StringValidationMessage })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'TypeScript 기반 풀스택 개발을 지향합니다. 팀장 메이플 좋아함.',
    description: '게시글 내용',
  })
  @IsString({ message: StringValidationMessage })
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    example: 1,
    description: '프로젝트 진행형태(1: 온라인, 2: 오프라인, 3: 상관없음)',
  })
  @IsInt({ message: IntValidationMessage })
  @Min(1, {
    message: WorkModeValidationMessage,
  })
  @Max(3, {
    message: WorkModeValidationMessage,
  })
  @IsOptional()
  workMode?: number;

  @ApiPropertyOptional({
    example: '2025-08-10:000Z... (ISO 형식)',
    description: '마감날짜',
  })
  @IsDateString({}, { message: DateValidationMessage })
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: 5, description: '모집 인원' })
  @IsInt({ message: IntValidationMessage })
  @IsPositive({
    message: PositiveIntValidationMessage,
  })
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: '기술 스택들은 번호로 된 배열',
  })
  @IsArray({ message: IntArrayValidationMessage })
  @IsInt({ each: true, message: IntArrayValidationMessage })
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastStackId, { each: true, message: MaxIntValidationMessage })
  @IsOptional()
  stacks?: number[];

  @ApiPropertyOptional({
    example: [1, 2],
    description: '포지션들은 번호로 된 배열',
  })
  @IsArray({ message: IntArrayValidationMessage })
  @IsInt({ each: true, message: IntArrayValidationMessage })
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastPositionId, { each: true, message: MaxIntValidationMessage })
  @IsOptional()
  positions?: number[];
}

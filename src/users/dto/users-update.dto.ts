import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import {
  ArrayEmptyValidationMessage,
  BooleanValidationMessage,
  IntArrayValidationMessage,
  IntValidationMessage,
  MaxIntValidationMessage,
  PositiveIntValidationMessage,
  StringValidationMessage,
  UrlValidationMessage,
  WorkModeValidationMessage,
} from 'src/shared/validators/messages/validation.messages';
import {
  LastPositionId,
  LastStackId,
} from 'src/shared/validators/values/validation.values';

export class UserUpdateDto {
  @ApiPropertyOptional({
    example: '홍길동',
    description: '유저 이름',
  })
  @IsOptional()
  @IsString({ message: StringValidationMessage })
  nickname?: string;

  @ApiPropertyOptional({
    example: '안녕하세요. 백엔드 개발자 홍길동입니다.',
    description: '유저 소개',
  })
  @IsOptional()
  @IsString({ message: StringValidationMessage })
  description?: string;

  @ApiPropertyOptional({
    example: '서울',
    description: '지역',
  })
  @IsOptional()
  @IsString({ message: StringValidationMessage })
  location?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg (변경될 수 있음)',
    description: '이미지 url / 변경될 수 있음',
  })
  @IsOptional()
  @IsString({ message: StringValidationMessage })
  //@IsUrl() // 이미지 저장 방식 결정 후 수정
  image?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/userId (아이디로 변경될 수 있음)',
    description: 'github 프로필 url / 아이디로 변경될 수 있음',
  })
  @IsOptional()
  @IsString({ message: StringValidationMessage })
  @IsUrl({}, { message: UrlValidationMessage })
  github?: string;

  @ApiPropertyOptional({
    example: 1,
    description: '프로젝트 진행형태(1: 온라인, 2: 오프라인, 3: 상관없음)',
  })
  @IsOptional()
  @IsInt({ message: IntValidationMessage })
  @Min(1, {
    message: WorkModeValidationMessage,
  })
  @Max(3, {
    message: WorkModeValidationMessage,
  })
  @Type(() => Number)
  workMode?: number;

  @ApiPropertyOptional({
    example: true,
    description: '새싹 여부 (true/false)',
  })
  @IsOptional()
  @IsBoolean({ message: BooleanValidationMessage })
  beginner?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: '프로필 공개 여부 (true/false)',
  })
  @IsOptional()
  @IsBoolean({ message: BooleanValidationMessage })
  isPublic?: boolean;

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: '기술 스택들은 번호로 된 배열',
  })
  @IsOptional()
  @IsArray({ message: IntArrayValidationMessage })
  @ArrayNotEmpty({ message: ArrayEmptyValidationMessage })
  @IsInt({ each: true, message: ArrayEmptyValidationMessage })
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastStackId, { each: true, message: MaxIntValidationMessage })
  @Type(() => Number)
  stacks?: number[];

  @ApiPropertyOptional({
    example: [1, 2],
    description: '포지션들은 번호로 된 배열',
  })
  @IsOptional()
  @IsInt({ message: IntValidationMessage })
  @Type(() => Number)
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastPositionId, { each: true, message: MaxIntValidationMessage })
  positionId?: number;
}

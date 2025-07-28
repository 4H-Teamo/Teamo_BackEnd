import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PostsIndexDto {
  @IsOptional()
  @Type(() => Number) // 문자열 → 숫자 변환
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;
}

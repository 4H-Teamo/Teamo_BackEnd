import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UuidValidationMessage } from 'src/shared/validators/messages/validation.messages';

export class UserIdDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: '사용자 아이디 (UUID 형식)',
  })
  @IsUUID(4, { message: UuidValidationMessage })
  userId: string;
}

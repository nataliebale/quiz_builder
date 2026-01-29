import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsObject()
  blocks!: Record<string, unknown>;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

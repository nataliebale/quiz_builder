import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  title!: string;

  @IsObject()
  blocks!: Record<string, unknown>;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

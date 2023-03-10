import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CategoryDTO implements Readonly<CategoryDTO> {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;
}

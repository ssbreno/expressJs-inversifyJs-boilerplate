import { IsNumber, IsString } from 'class-validator';

export class InstallmentsDTO implements Readonly<InstallmentsDTO> {
  @IsString()
  name: string;
  @IsNumber()
  installments: number;
  @IsNumber()
  value: number;
  @IsNumber()
  tax: number;
}

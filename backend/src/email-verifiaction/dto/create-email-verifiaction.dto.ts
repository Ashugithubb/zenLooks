import { IsEmail, IsString } from "class-validator";

export class CreateEmailVerifiactionDto {
    
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}



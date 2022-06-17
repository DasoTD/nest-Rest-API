import { IsEmail, IsNotEmpty, IsOptional, isString, IsString } from "class-validator"


export class updateDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstname?: string;

    @IsString()
    @IsOptional()
    lastname?: string;

}

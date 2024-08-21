import {IsNotEmpty,IsString,IsEmail,MinLength} from 'class-validator';

export class LoginDto{
   
    @IsNotEmpty()
    @IsEmail( {} ,{ message: "Please enter correct email"})
    readonly Email: string;
    

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly Password: string;



}
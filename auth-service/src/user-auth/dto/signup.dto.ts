import {IsNotEmpty,IsString,IsEmail,MinLength} from 'class-validator';

console.log("SignUpDto");

export class SignUpDto{

    @IsNotEmpty()
    @IsString()
    readonly Name: string;

    @IsNotEmpty()
    @IsEmail( {} ,{ message: "Please enter correct email"})
    readonly Email: string;
    

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly Password: string;



}
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string
    // @Matches(
    //     /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: 'some issues with the password'
    // })

    @IsString()
    fullName: string
}
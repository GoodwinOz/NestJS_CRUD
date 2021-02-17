import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator'

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UserDto {
    @IsNotEmpty({
        message: 'Field must not be empty'
    })
    readonly name: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'Select gender (Male/Female)'
    })
    readonly gender: Gender
}
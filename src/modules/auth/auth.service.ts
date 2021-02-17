import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
// import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findOneByEmail(username)
        if(!user) {
            return null
        }

        const match = await this.comparePassword(pass, user.password)
        if (!match) {
            return null
        }

        const { password, ...result } = user['dataValues']
        return result
    }

    //user login
    public async login(user) {
        const token = await this.generateToken(user)
        return { user, token }
    }

    //user creation
    public async create(user) {
        //hash pass
        const pass = await this.hashPassword(user.password)
    

        //create user
        const newUser = await this.userService.create({ ...user, password: pass})

        const { password, ...result } = newUser['dataValues']

        const token = await this.generateToken(result)

        return { user: result, token }
    }

    //token generation
    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user)
        return token
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword)
        return match
    }
}
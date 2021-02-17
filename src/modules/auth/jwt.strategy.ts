import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY,
        })
    }

    async validate(payload: any) {
        //check token actualuty
        const user = await this.userService.findOneById(payload.id)
        if(!user) {
            throw new UnauthorizedException('You\'r not authorized')
        }
        return payload
    }
}
import { Injectable, Inject } from '@nestjs/common'
import { User } from './user.entity'
import { UserDto } from './dto/user.dto'
import { USER_REPOSITORY } from '../../core/constants'

@Injectable()
export class UsersService{
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    //Create new User to *user* table
    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user)
    }

    //Find a user in *user* table by email
    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email }})
    }

    //Find user in *user* table by id
    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id }})
    }
}


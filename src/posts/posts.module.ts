import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './post.service'
import { postsProviders } from './post.providers'

//Grouping service, controller, post entity & etc. into a module

@Module({
    controllers: [PostsController],
    providers: [PostsService, ...postsProviders],
})
export class PostsModule {}
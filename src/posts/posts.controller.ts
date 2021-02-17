import { Controller, Get, Param, Post, Put, Delete, Body, NotFoundException, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PostsService } from './post.service'
import { Post as PostEntity } from './post.entity'
import { PostDto } from './dto/post.dto'

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get()
    //Get all posts
    async findAll() {
        return await this.postService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostEntity> {
        const post = await this.postService.findOne(id)

        if (!post) {
            throw new NotFoundException('This post doesn\'t exist')
        }
        return post
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        //Create new post
        return await this.postService.create(post, req.user.id)
    }


    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
        //Get num. of row affeced and updated post
        const { numberOfAffectedRows, updatedPost } = await this.postService.update(id, post, req.user.id)

        if (numberOfAffectedRows === 0 ) {
            throw new NotFoundException('This post doesn\'t exist')
        }

        return updatedPost
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.postService.delete(id, req.user.id)

        if (deleted === 0) {
            throw new NotFoundException('This post doesn\'t exist')
        }

        return 'Successfully deleted'
    }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { Module } from '@nestjs/common'
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express'


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostsModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    FilesModule,
    MulterModule.register({
      dest: './uploads',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
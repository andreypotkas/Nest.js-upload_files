import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), UploadModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

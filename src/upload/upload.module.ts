import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseFile } from './entities/upload.entity';

@Module({
  imports: [SequelizeModule.forFeature([DatabaseFile])],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}

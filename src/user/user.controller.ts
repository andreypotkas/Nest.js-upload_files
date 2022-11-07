import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
  Put,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { DatabaseFile } from 'src/upload/entities/upload.entity';
import { UploadService } from 'src/upload/upload.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly uploadService: UploadService,
  ) {}
  // get user
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }
  // create user
  @Post()
  create(@Body() userDto: any) {
    return this.usersService.createUser(userDto);
  }
  // add avatar
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create(file.buffer, file.originalname, 1);
  }
  // update avatar
  @Put('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<DatabaseFile> {
    const updatedFile = await this.uploadService.update(
      {
        data: file.buffer,
        filename: file.originalname,
      },
      // we can take userId from req.user.id if authorization implemented
      1,
    );

    if (updatedFile.numberOfAffectedRows === 0) {
      throw new NotFoundException("This File doesn't exist");
    }

    return updatedFile.updatedFile;
  }
  // delete avatar
  @Delete('avatar')
  async remove(@Request() req) {
    // we can take userId from req.user.id if authorization implemented
    const deleted = await this.uploadService.delete(1);

    if (deleted === 0) {
      throw new NotFoundException("This File doesn't exist");
    }

    return 'Successfully deleted';
  }
}

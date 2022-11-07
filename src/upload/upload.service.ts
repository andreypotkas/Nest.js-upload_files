import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DatabaseFile } from './entities/upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(DatabaseFile)
    private databaseFilesRepository: typeof DatabaseFile,
  ) {}

  async create(dataBuffer: Buffer, filename: string, userId: number) {
    const avatar = await this.getOneByUserId(userId);

    if (avatar) throw new ForbiddenException('This user already have avatar');

    const newFile = await this.databaseFilesRepository.create({
      filename: filename,
      data: dataBuffer,
      userId: userId,
    });

    return newFile;
  }

  async getAvatarById(id: number): Promise<DatabaseFile> {
    return await this.databaseFilesRepository.findOne({
      where: { id },
    });
  }

  async delete(userId: number) {
    return await this.databaseFilesRepository.destroy({
      where: { userId },
    });
  }

  async update(data: any, userId: number) {
    const [numberOfAffectedRows, [updatedFile]] =
      await this.databaseFilesRepository.update(
        { ...data },
        { where: { userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedFile };
  }

  async getOneByUserId(userId: number) {
    return await this.databaseFilesRepository.findOne({
      where: { userId },
    });
  }
}

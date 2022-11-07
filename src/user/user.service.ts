import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UploadService } from 'src/upload/upload.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private usersRepository: typeof User,
    private readonly uploadService: UploadService,
  ) {}

  async createUser(dto: any) {
    const user = await this.usersRepository.create(dto);
    return user;
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne<User>({
      where: { id },
      // include avatar data if nessesary | include: DatabaseFile,
    });
  }
}

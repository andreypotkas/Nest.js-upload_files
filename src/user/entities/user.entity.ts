import { Column, DataType, Table, Model, HasOne } from 'sequelize-typescript';
import { DatabaseFile } from 'src/upload/entities/upload.entity';

@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @HasOne(() => DatabaseFile)
  avatar: DatabaseFile;
}

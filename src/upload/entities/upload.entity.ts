import {
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

interface DatabaseFileType {
  filename: string;
  data: Uint8Array;
  userId: number;
}

@Table({ tableName: 'files' })
export class DatabaseFile extends Model<DatabaseFile, DatabaseFileType> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  filename: string;

  @Column({ type: DataType.BLOB, allowNull: false })
  data: Uint8Array;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

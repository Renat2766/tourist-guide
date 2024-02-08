import {Model} from "sequelize-typescript";
import {Column, DataType, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


interface UserCreationAttrs {
  email: string
  password: string
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttrs>{
  @ApiProperty({example: '1', description: 'Unique id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'test@test.tt', description: 'Email'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @ApiProperty({example: '123abc', description: 'Password'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  password: string
}
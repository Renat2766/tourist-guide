import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private UserRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.UserRepository.create(dto)
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.UserRepository.findOne({where: {email},
      include: {all: true}})
    return user
  }
}

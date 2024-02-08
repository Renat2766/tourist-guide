import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User} from "../users/user.model";
import * as bcrypt from "bcrypt"


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
      const candidate = await this.userService.getUserByEmail(userDto.email)
      if(candidate) {
        throw new HttpException('A user with this email exists',
          HttpStatus.BAD_REQUEST)
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5)
      const user = await this.userService.createUser({...userDto, password: hashPassword})

    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = {email: user.email, id: user.id}

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)

    if(user && passwordEquals) {
        return user
    }

    throw new UnauthorizedException({message: 'Password or email incorrect'})
  }
}

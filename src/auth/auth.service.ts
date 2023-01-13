import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto

      console.log(createUserDto)
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user)
      delete user.password

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      this.handleDBError(error)
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)

    return token
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail + "some")
    }
    console.log(error)
    throw new InternalServerErrorException("u know")
  }

  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email: email },
      select: { email: true, password: true, id: true }
    })
    delete user.product
    console.log(loginUserDto)
    console.log(user)


    if (!user) {
      throw new UnauthorizedException('Credentials are not valid')
    }
    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid')
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }

    
  }
}

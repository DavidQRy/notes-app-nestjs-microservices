import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { enviroments } from 'src/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService){

  }

  async register(registerUserDto: RegisterUserDto){
    return { registerUserDto }
  }

  async login(loginUserDto: LoginUserDto){
    return {loginUserDto}
  }

  async verify(token: string) {
    try {
      const { _, __, ___, user } = this.jwtService.verify(token, {
        secret: enviroments.jwtSecret
      })

      return {
        user: user,
        token: this.singJwt(user)
      }
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message
      })
    }
  }

  singJwt(payload: IJwtPayload) {
    return this.jwtService.sign(payload)
  }
}

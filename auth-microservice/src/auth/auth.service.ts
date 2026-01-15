import { Injectable, OnModuleInit } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { enviroments } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  
  constructor(private readonly jwtService: JwtService){
    const connectionString = `${process.env.DATABASE_URL}`
    
    const adapter = new PrismaPg({ connectionString })
    super({adapter})
  }

  async onModuleInit() {
      await this.$connect()
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

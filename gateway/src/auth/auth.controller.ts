import { Controller, Get, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';


@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register', registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.client.send('auth.login', loginUserDto)
  }

   @UseGuards(AuthGuard)
  @Get('verify')
  varify() {
    return "...varifing";
  }

}

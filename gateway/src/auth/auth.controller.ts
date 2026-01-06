import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return registerUserDto;
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return loginUserDto
  }

   @UseGuards(AuthGuard)
  @Get('verify')
  varify() {
    return "...varifing";
  }

}

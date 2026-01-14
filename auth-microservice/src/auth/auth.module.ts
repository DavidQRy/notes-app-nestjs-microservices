import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { enviroments } from 'src/config';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: enviroments.jwtSecret,
      signOptions: {
        expiresIn: '1h'
      }
    })
  ]
})
export class AuthModule {}

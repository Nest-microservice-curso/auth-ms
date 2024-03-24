import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerDto: any) {
    const register = this.authService.registerUser(registerDto);
    return register;
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginDto: any) {
    const login = this.authService.loginUser(loginDto);
    return login;
  }

  @MessagePattern('auth.verify.user')
  verifyToken(@Payload() tokenDto: any) {
    const token = this.authService.verifyToken(tokenDto);
    return token;
  }
}

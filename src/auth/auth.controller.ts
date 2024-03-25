import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from './dto';

@Controller()
export class AuthController {
  private logger = new Logger('auth-auth.controller.ts');

  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerDto: RegisterDto) {
    const register = this.authService.registerUser(registerDto);
    return register;
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginDto: LoginDto) {
    const login = this.authService.loginUser(loginDto);
    return login;
  }

  @MessagePattern('auth.verify.user')
  verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }
}

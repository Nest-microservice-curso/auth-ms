import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  registerUser(registerDto) {
    return { ...registerDto, mensaje: 'desde el microservicio, registerUser' };
  }
  loginUser(loginDto) {
    return { ...loginDto, mensaje: 'desde el microservicio, loginUser' };
  }
  verifyToken(tokenDto) {
    return { ...tokenDto, mensaje: 'desde el microservicio, verifyToken' };
  }
}

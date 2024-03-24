import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('auth.service.ts');

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.debug('Database connected');
  }

  async registerUser(registerDto: RegisterDto) {
    this.logger.warn('Entrando en el metodo para registrar');
    const user = await this.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });
    this.logger.warn('Despues de la busqueda del usuario en la BD');

    if (user) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `The email ${registerDto.email} has taken`,
      });
    }
    const newUser = await this.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password: bcrypt.hashSync(registerDto.password, 12),
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: __, ...data } = newUser;
    const token = this.jwtService.sign({ id: data.id });
    return {
      user: data,
      token: token,
    };
  }
  async loginUser(loginDto: LoginDto) {
    const user = await this.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: `Email/Password not found, please try again`,
      });
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: `Email/Password not found, please try again`,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: __, ...data } = user;
    const token = this.jwtService.sign({ id: data.id });
    return {
      user: data,
      token: token,
    };
  }
  verifyToken(tokenDto: string) {
    return { tokenDto, mensaje: 'desde el microservicio, verifyToken' };
  }
}

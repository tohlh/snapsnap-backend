import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../models/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // For Local strategy
  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    if (await bcrypt.compareSync(password, user.passwordDigest)) {
      const { passwordDigest, ...result } = user;
      return result;
    }
    return null;
  }

  // For JWT strategy
  async validateUserByEmail(email: string): Promise<any> {
    const user = this.userService.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validate(email, password);
    if (user) {
      const token = await this.generateToken(user);
      return token;
    }
    return null;
  }

  async register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<any> {
    if (password !== passwordConfirmation) {
      throw new Error('Password confirmation does not match password');
    }
    try {
      const user = await this.userService.create({
        name: name,
        email: email,
        passwordDigest: await bcrypt.hash(password, 10),
      });
      const token = await this.generateToken(user);
      return token;
    } catch (err) {
      throw new Error('Email has been registered');
    }
  }

  async generateToken(user: any): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}

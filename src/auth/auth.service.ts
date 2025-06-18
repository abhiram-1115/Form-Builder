import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(email: string, password: string) {
        const user = await this.usersService.create(email, password);
        
        const payload = { sub: user.id, email: user.email };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

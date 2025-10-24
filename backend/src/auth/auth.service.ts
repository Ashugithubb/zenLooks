import { ConflictException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';
import { HasingService } from 'src/hasing/hasing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthJwtPayload } from './type/auth.payload';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(
         @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private hasingService: HasingService,
        private jwtService: JwtService,
        private configService: ConfigService,) { }

    async validateUser({ email, password }: { email: string, password: string }) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) throw new UnauthorizedException("User email not found");
        const matched = await this.hasingService.compare(password, user.password);
        if (!matched) throw new UnauthorizedException("Invalid password");
        return { email: user.email, id: user.userId, role:user.role };
    }


    async login(payload: AuthJwtPayload, res: Response) {

        const token = await this.jwtService.sign(payload)
        res.cookie('access_token', token, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            maxAge: 4 * 60 * 100000,
        });
        return {
            "msg": "Loged In Successfully",
            "token": token,
            "role":payload.role
        }
    }

}




import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh',) {
    jwtService: any;
    userRepository: any;
    constructor() {
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
        if(!JWT_REFRESH_SECRET){
            throw new Error("JWT_REFRESH_SECRET not d=found in env") ;
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new Error("authHeader notfound in env") ;
        }
        const refreshToken = authHeader.replace('Bearer','').trim();
        return{ ...payload, refreshToken };
    }
async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    // Update the hashed refresh token in the database for the user
    await this.userRepository.update(userId, { refreshToken: hashedRefreshToken });
  }
    hashData(refreshToken: string) {
        throw new Error("Method not implemented.");
    }
  async getTokens(userId: number, username: string) {
    const[ accessToken, refreshToken ] = await Promise.all([
        this.jwtService.signAsync({ 
            sub: userId,
             username },
             { secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                 expiresIn: '15m' },
                ),
        this.jwtService.signAsync(
            { sub: userId,
                 username }, { secret: this.configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '7d' },
                ),
    ]);
    return { accessToken, refreshToken };
  } 
}
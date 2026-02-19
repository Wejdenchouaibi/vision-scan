import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/auth.dto';
interface JwtPayload {
  sub: number;
  username: string;
}

interface UserPayload {
  sub: number;
  username: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('signin')
signin(@Body() data:AuthDto) {
  return this.authService.signIn(data);}
  @Get('logout')
  logout(@Req() req:Request & { user: UserPayload }) {
    this.authService.logout(req.user.sub);}

}

import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { get } from 'http';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Jwtstrategy } from 'src/auth/strategy';
import { updateDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private user:UserService){

    }

    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string){
        console.log({
            user: user,
            email
        })
        return user
    }

    @Patch('me')
    update(@GetUser('id') userId: number, @Body() dto: updateDto){
        return this.user.update(userId, dto)

    }
}

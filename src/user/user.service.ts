import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){

    }
    async update(userId: number, dto: updateDto){
        try {
           const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
           }) ;
           return user;
        } catch (error: any) {
            throw new error
        }
    }
}

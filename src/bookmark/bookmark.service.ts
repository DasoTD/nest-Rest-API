import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService){

    }
    async createBookmark(userId: number, dto: CreateBookmarkDTO){
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })

        return bookmark;
    }
    getBookmarkById(userId: number, bookmarkId: number){
        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId
            }
        })
    }
    getBookmarks(userId: number){
        return this.prisma.bookmark.findMany({
            where: {
                userId
            }
        })
    }

    async updateBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDTO){
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })
        if(!bookmark || bookmark.userId !== userId){
            throw new ForbiddenException('Access to resources denied')
        } 
        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...dto
            }
        })
    }

    async deleteBookmark(userId: number, bookmarkId: number){
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })
        if(!bookmark || bookmark.userId !== userId){
            throw new ForbiddenException('Access to resources denied')
        } 
        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId
            }
        })
    }
}

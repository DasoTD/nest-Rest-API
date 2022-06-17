import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmark: BookmarkService){

    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDTO){
        return this.bookmark.createBookmark(userId, dto);
    }
    @Get(':id')
    getBookmarkById(@GetUser('id') userId: number, 
    @Param('id', ParseIntPipe) bookmarkId: number,){
        return this.bookmark.getBookmarkById(
            userId, 
            bookmarkId
            )
    }
    @Get()
    getBookmarks(@GetUser('id') userId: number){
        return this.bookmark.getBookmarks(userId)
    }

    @Patch(':id')
    updateBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDTO){
        return this.bookmark.updateBookmark(userId, bookmarkId, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmark(@GetUser('id') userId: number, 
    @Param('id', ParseIntPipe) bookmarkId: number,){
        return this.bookmark.deleteBookmark(userId, bookmarkId)
    }
}

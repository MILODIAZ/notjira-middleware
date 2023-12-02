import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport/dist';

import { CommentMSG } from 'src/common/constants';
import { commentDto } from 'src/management/dto/comment.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('comments')
@Controller('api/v1/comment')
export class CommentController {
  constructor(private readonly clientProxy: ClientProxyNotJira) {}
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.clientProxyManagement.send(CommentMSG.FIND_ALL, '');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyManagement.send(CommentMSG.FIND_ONE, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() payload: commentDto) {
    return this.clientProxyManagement.send(CommentMSG.CREATE, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: commentDto) {
    return this.clientProxyManagement.send(CommentMSG.UPDATE, { id, payload });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyManagement.send(CommentMSG.DELETE, id);
  }
}

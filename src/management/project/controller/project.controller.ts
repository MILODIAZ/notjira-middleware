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

import { ProjectMSG } from 'src/common/constants';
import { projectDto } from '../dto/project.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('projects')
@Controller('api/v1/project')
export class ProjectController {
  constructor(private readonly clientProxy: ClientProxyNotJira) {}
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.clientProxyManagement.send(ProjectMSG.FIND_ALL, '');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyManagement.send(ProjectMSG.FIND_ONE, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() payload: projectDto) {
    return this.clientProxyManagement.send(ProjectMSG.CREATE, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: projectDto) {
    return this.clientProxyManagement.send(ProjectMSG.UPDATE, { id, payload });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyManagement.send(ProjectMSG.DELETE, id);
  }
}

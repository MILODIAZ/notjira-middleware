import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProjectMSG } from 'src/common/constants';
import { projectDto } from '../dto/project.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('projects')
@Controller('api/v1/project')
export class ProjectController {
  constructor(private readonly clientProxy: ClientProxyNotJira) { }
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

  @Get()
  findAll() {
    return this.clientProxyManagement.send(ProjectMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyManagement.send(ProjectMSG.FIND_ONE, id);
  }

  @Post()
  create(@Body() payload: projectDto) {
    return this.clientProxyManagement.send(ProjectMSG.CREATE, payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: projectDto) {
    return this.clientProxyManagement.send(ProjectMSG.UPDATE, { id, payload });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyManagement.send(ProjectMSG.DELETE, id);
  }
}

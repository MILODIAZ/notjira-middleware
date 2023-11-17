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

import { TaskMSG } from 'src/common/constants';
import { taskDto } from '../dto/task.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('tasks')
@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly clientProxy: ClientProxyNotJira) { }
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

  @Get()
  findAll() {
    return this.clientProxyManagement.send(TaskMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyManagement.send(TaskMSG.FIND_ONE, id);
  }

  @Post()
  create(@Body() payload: taskDto) {
    return this.clientProxyManagement.send(TaskMSG.CREATE, payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: taskDto) {
    return this.clientProxyManagement.send(TaskMSG.UPDATE, { id, payload });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyManagement.send(TaskMSG.DELETE, id);
  }
}

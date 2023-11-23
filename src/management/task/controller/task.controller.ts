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

import { TaskMSG } from 'src/common/constants';
import { taskDto, FilterTasksDto } from '../dto/task.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('tasks')
@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly clientProxy: ClientProxyNotJira) {}
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

  @UseGuards(AuthGuard('jwt'))
  @Post('getTask')
  findAll(@Body() payload: FilterTasksDto) {
    return this.clientProxyManagement.send(TaskMSG.FIND_ALL, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyManagement.send(TaskMSG.FIND_ONE, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() payload: taskDto) {
    return this.clientProxyManagement.send(TaskMSG.CREATE, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: taskDto) {
    return this.clientProxyManagement.send(TaskMSG.UPDATE, { id, payload });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyManagement.send(TaskMSG.DELETE, id);
  }
}

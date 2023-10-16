import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { TeamMSG } from 'src/common/constants';
import { teamDto } from '../dto/team.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('teams')
@Controller('api/v1/team')
export class TeamController {
  constructor(private readonly clientProxy: ClientProxyNotJira) {}
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

  @Get()
  findAll() {
    return this.clientProxyManagement.send(TeamMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyManagement.send(TeamMSG.FIND_ONE, id);
  }

  @Post()
  create(@Body() payload: teamDto) {
    return this.clientProxyManagement.send(TeamMSG.CREATE, payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: teamDto) {
    return this.clientProxyManagement.send(TeamMSG.UPDATE, { id, payload });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyManagement.send(TeamMSG.DELETE, id);
  }

  @Post('add/:id')
  addUser(@Param('id') id: string, @Query('userName') userName: string) {
    return this.clientProxyManagement.send(TeamMSG.ADD_USER, { id, userName });
  }

  @Post('remove/:id')
  removeUser(@Param('id') id: string, @Query('userName') userName: string) {
    return this.clientProxyManagement.send(TeamMSG.REMOVE_USER, {
      id,
      userName,
    });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { ApiTags } from '@nestjs/swagger';

import { TeamMSG } from 'src/common/constants';
import { teamDto } from '../dto/team.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('teams')
@Controller('api/v1/team')
export class TeamController {
  constructor(private readonly clientProxy: ClientProxyNotJira) {}
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.clientProxyManagement.send(TeamMSG.FIND_ALL, '');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyManagement.send(TeamMSG.FIND_ONE, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() payload: teamDto) {
    return this.clientProxyManagement.send(TeamMSG.CREATE, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: teamDto) {
    return this.clientProxyManagement.send(TeamMSG.UPDATE, { id, payload });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clientProxyManagement.send(TeamMSG.DELETE, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add/:id')
  addUser(@Param('id') id: number, @Query('userName') userName: string) {
    console.log(id);
    return this.clientProxyManagement.send(TeamMSG.ADD_USER, { id, userName });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove/:id')
  removeUser(@Param('id') id: number, @Query('userName') userName: string) {
    console.log(id);
    return this.clientProxyManagement.send(TeamMSG.REMOVE_USER, {
      id,
      userName,
    });
  }
}

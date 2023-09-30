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
import { UserMSG } from 'src/common/constants';
import { userDto, updateUserDto } from '../dto/user.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@ApiTags('users')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyNotJira) { }
  private clientProxyUser = this.clientProxy.clientProxyAuthorization();
  @Post('login')
  login() {
    return this.clientProxyUser.send('login', {
      username: 'MiloSky',
      password: '543',
    });
  }

  @Post('/login')
  login(@Body() payload: any) {
    return this.clientProxyUser.send('login', payload);
  }

  @Put('/password')
  recoverPassword(@Body() payload: any) {
    return this.clientProxyUser.send('recoverPassword', payload);
  }

  @Get()
  findAll() {
    return this.clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Post()
  create(@Body() payload: userDto) {
    return this.clientProxyUser.send(UserMSG.CREATE, payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: updateUserDto) {
    return this.clientProxyUser.send(UserMSG.UPDATE, { id, payload });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyUser.send(UserMSG.DELETE, id);
  }
}

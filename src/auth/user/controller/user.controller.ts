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
  constructor(private readonly clientProxy: ClientProxyNotJira) {}
  private clientProxyUser = this.clientProxy.clientProxyAuthorization();
  private clientProxyManagement = this.clientProxy.clientProxyManagement();

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
  async create(@Body() payload: userDto) {
    const result1 = await this.clientProxyUser
      .send(UserMSG.CREATE, payload)
      .toPromise();
    const result2 = await this.clientProxyManagement
      .send(UserMSG.CREATE, payload)
      .toPromise();
    return { result1, result2 };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: updateUserDto) {
    const result1 = this.clientProxyUser
      .send(UserMSG.UPDATE, { id, payload })
      .toPromise();
    const result2 = this.clientProxyManagement
      .send(UserMSG.UPDATE, { id, payload })
      .toPromise();
    return { result1, result2 };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result1 = this.clientProxyUser.send(UserMSG.DELETE, id).toPromise();
    const result2 = this.clientProxyManagement
      .send(UserMSG.DELETE, id)
      .toPromise();
    return { result1, result2 };
  }
}

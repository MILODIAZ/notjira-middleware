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

import { UserMSG } from 'src/common/constants';
import {
  userDto,
  updateUserDto,
  loginDto,
  recoveryPassDto,
} from '../dto/user.dto';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';
import { AuthService } from 'src/auth/services/auth.service';

@ApiTags('users')
@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly clientProxy: ClientProxyNotJira,
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() payload: loginDto) {
    console.log('here');
    const response = await this.clientProxyUser
      .send('login', payload)
      .toPromise();
    const jwt = this.authService.generateJWT(response);
    if (jwt.access_token) {
      const userName = payload.userName;
      const token: string = jwt.access_token;
      response.jwt = jwt.access_token;
      await this.clientProxyUser
        .send(UserMSG.JWT, { userName, token })
        .toPromise();
    }
    return response;
  }

  @Put('/password')
  recoverPassword(@Body() payload: recoveryPassDto) {
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

  @UseGuards(AuthGuard('jwt'))
  @Put(':userName')
  async update(
    @Param('userName') userName: string,
    @Body() payload: updateUserDto,
  ) {
    const result1 = await this.clientProxyUser
      .send(UserMSG.UPDATE, { userName, payload })
      .toPromise();
    const result2 = await this.clientProxyManagement
      .send(UserMSG.UPDATE, { userName, payload })
      .toPromise();
    return { result1, result2 };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result1 = await this.clientProxyUser
      .send(UserMSG.DELETE, id)
      .toPromise();
    const result2 = await this.clientProxyManagement
      .send(UserMSG.DELETE, id)
      .toPromise();
    return { result1, result2 };
  }
}

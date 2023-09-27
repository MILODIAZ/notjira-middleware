import { Module } from '@nestjs/common';
import { UserController } from './user/controller/user.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@Module({
  imports: [ProxyModule],
  providers: [ClientProxyNotJira],
  controllers: [UserController],
})
export class AuthModule {}

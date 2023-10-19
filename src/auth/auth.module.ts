import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { UserController } from './user/controller/user.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import config from 'src/config';

@Module({
  imports: [
    ProxyModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.JwtSecret,
        };
      },
    }),
  ],
  providers: [ClientProxyNotJira, AuthService, JwtStrategy],
  controllers: [UserController],
})
export class AuthModule {}

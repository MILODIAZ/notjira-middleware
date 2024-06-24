import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RabbitMQ } from '../constants';
import { join } from 'path';

@Injectable()
export class ClientProxyNotJira {
  constructor(private readonly config: ConfigService) {}

  /*
  clientProxyAuthorization(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('AMQP_URL'),
        queue: RabbitMQ.AuthorizationQueue,
      },
    });
  }

  clientProxyManagement(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('AMQP_URL'),
        queue: RabbitMQ.ManagementQueue,
      },
    });
  }
  */
  clientProxyAuth(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: 'auth',
        protoPath: join(__dirname, 'node_modules/archi/proto/auth.proto'),
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      },
    });
  }
}

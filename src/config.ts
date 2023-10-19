import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    rabbitMQ: {
      url: process.env.AMQP_URL,
    },
    JwtSecret: process.env.JWT_SECRET,
  };
});

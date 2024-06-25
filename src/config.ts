import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    grpc: {
      url: process.env.GRPC_CONNECTION_URL,
    },
    JwtSecret: process.env.JWT_SECRET,
  };
});

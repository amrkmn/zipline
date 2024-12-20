import fastifyPlugin from 'fastify-plugin';
import { join } from 'path';

export const PATH = '/favicon';
export default fastifyPlugin(
  (server, _, done) => {
    server.get(PATH, (_, res) => {
      return res.sendFile('favicon-32x32.png', join(process.cwd(), 'public'));
    });

    done();
  },
  { name: PATH },
);

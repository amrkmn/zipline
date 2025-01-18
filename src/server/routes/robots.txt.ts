import { config } from '@/lib/config';
import fastifyPlugin from 'fastify-plugin';

export const PATH = '/robots.txt';
export default fastifyPlugin(
  (server, _, done) => {
    server.get(PATH, async (_, res) => {
      if (!config.features.robotsTxt) return res.notFound();

      return 'User-Agent: *\nDisallow: /';
    });

    done();
  },
  { name: PATH },
);

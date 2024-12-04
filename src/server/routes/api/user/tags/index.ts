import { prisma } from '@/lib/db';
import { Tag, tagSelect } from '@/lib/db/models/tag';
import { log } from '@/lib/logger';
import { userMiddleware } from '@/server/middleware/user';
import fastifyPlugin from 'fastify-plugin';

export type ApiUserTagsResponse = Tag | Tag[];

type Body = {
  name: string;
  color: string;
};

const logger = log('api').c('user').c('tags');

export const PATH = '/api/user/tags';
export default fastifyPlugin(
  (server, _, done) => {
    server.get(PATH, { preHandler: [userMiddleware] }, async (req, res) => {
      const tags = await prisma.tag.findMany({
        where: {
          userId: req.user.id,
        },
        select: tagSelect,
      });

      return res.send(tags);
    });

    server.post<{ Body: Body }>(PATH, { preHandler: [userMiddleware] }, async (req, res) => {
      const { name, color } = req.body;

      const tag = await prisma.tag.create({
        data: {
          name,
          color,
          userId: req.user.id,
        },
        select: tagSelect,
      });

      logger.info('tag created', {
        id: tag.id,
        name: tag.name,
        user: req.user.username,
      });

      return res.send(tag);
    });

    done();
  },
  { name: PATH },
);

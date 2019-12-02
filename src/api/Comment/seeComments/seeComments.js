import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeComments: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;

      return prisma.comments({
        where: {
          post: {
            id: postId
          }
        }
      });
    }
  }
};

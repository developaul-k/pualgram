import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeNotifications: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user: { id } } = request;

      return prisma.notifications({
        where: {
          post: {
            user: {
              id
            }
          }
        },
        orderBy: 'createdAt_DESC'
      });
    }
  }
};

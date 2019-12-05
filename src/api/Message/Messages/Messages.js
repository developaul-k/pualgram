import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    messages: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, skip } = args;

      return prisma.messages({
        where: {
          room: {
            id
          }
        },
        skip,
        last: 10
      });
    }
  }
};

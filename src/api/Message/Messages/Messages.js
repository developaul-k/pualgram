import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    messages: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;

      return prisma.messages({
        where: {
          room: {
            id
          }
        }
      });
    }
  }
};

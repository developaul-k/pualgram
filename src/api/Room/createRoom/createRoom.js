import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toId } = args;
      if (user.id !== toId) {
        return await prisma.createRoom({
          participants: {
            connect: [{ id: toId }, { id: user.id }]
          }
        });
      }
    }
  }
};

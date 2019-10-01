import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;

      let room;

      room = await prisma.room({ id: roomId });

      if (!room) {
        throw Error('Room not found');
      }

      return prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
    }
  }
};

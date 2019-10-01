import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      console.log('here')
      return prisma.post({ id });
    }
  }
};

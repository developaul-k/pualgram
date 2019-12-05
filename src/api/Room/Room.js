import { prisma } from '../../../generated/prisma-client';

export default {
  Room: {
    participants: ({ id }) => prisma.room({ id }).participants(),
    /* messages: ({ id, ...last }) => {
      console.log({ last });
      return prisma.room({ id }).messages();
    } */
  }
};

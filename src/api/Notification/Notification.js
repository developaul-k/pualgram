import { prisma } from '../../../generated/prisma-client';

export default {
  Notification: {
    creator: ({ id }) => prisma.notification({ id }).creator(),
    post: ({ id }) => prisma.notification({ id }).post()
  }
};

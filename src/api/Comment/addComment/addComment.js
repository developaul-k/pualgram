import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        },
        text
      });

      /**
       * TODO - 코멘트 기능 추가 후 작업
       */
      /* await prisma.createNotification({
        creator: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: postUserId
          }
        },
        imageId: postId,
        notificationType: 'COMMENT'
      }); */

      return comment;
    }
  }
};

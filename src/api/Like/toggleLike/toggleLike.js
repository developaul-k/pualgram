import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId, postUserId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          await prisma.deleteManyLikes(filterOptions);
          await prisma.deleteManyNotifications({
            AND: [
              {
                creator: {
                  id: user.id
                }
              },
              {
                post: {
                  id: postId
                }
              }
            ]
          });
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });

          await prisma.createNotification({
            creator: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            },
            notificationType: 'LIKE'
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};

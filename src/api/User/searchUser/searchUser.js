import {prisma} from '../../../../generated/prisma-client';
export default {
  Query: {
    searchUser: async (_, args, {request, isAuthenticated}) => {
      isAuthenticated(request);
      const { user } = request;

      return prisma.users({
        where: {
          OR: [
            {
              username_contains: args.term
            }, {
              firstName_contains: args.term
            }, {
              lastName_contains: args.term
            }
          ],
          NOT: [
            {
              username_contains: user.username
            }
          ]
        }
      })
    }
  }
};

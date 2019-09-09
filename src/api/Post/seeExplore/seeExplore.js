import {prisma} from "../../../../generated/prisma-client";

export default {
  Query: {
    seeExplore: async (_, args, {request, isAuthenticated}) => {
      isAuthenticated(request);

      const { length } = args;

      console.log( length )

      return prisma.posts({
        orderBy: "createdAt_DESC",
        first: length
      });
    }
  }
};

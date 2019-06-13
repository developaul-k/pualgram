import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    removeComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { commentId } = args;
      const existComment = await prisma.$exists.comment({ id: commentId });

      if (existComment) {
        const comment = await prisma.deleteComment({ id: commentId });
        return comment;
      }
    }
  }
};

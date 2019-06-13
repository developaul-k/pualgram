import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    removeSecret: async (_, args) => {

      const { email } = args;

      try {
        await prisma.updateUser({
          data: {
            loginSecret: ""
          },
          where: {
            email
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};

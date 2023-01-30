import { z } from "zod";
import { billCreateSchema } from "../../../pages/create-bill";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const billRouter = createTRPCRouter({
  getUserBills: protectedProcedure.query(async ({ ctx }) => {
    const bills = await ctx.prisma.billItem.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return bills;
  }),

  create: protectedProcedure
    .input(billCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.billItem.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
});

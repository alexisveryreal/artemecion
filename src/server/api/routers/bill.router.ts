import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { billCreateSchema } from "../../../pages/create-bill";
import { editBillSchema } from "../../../pages/edit-bill/[bill-id]";

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

  getBill: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const bill = await ctx.prisma.billItem.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!bill) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bill not found",
        });
      }

      return bill;
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

  edit: protectedProcedure.input(editBillSchema).mutation(({ input, ctx }) => {
    const { id, ...rest } = input;

    return ctx.prisma.billItem.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }),
});

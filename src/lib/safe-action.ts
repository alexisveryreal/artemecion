import { auth } from "@clerk/nextjs/server";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action Error: ", e.message);

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { userId } });
});

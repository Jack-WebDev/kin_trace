import { authRouter } from "./routers/auth";
import { addressRouter } from "./routers/address";
import { createCallerFactory, createRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { clientRouter } from "./routers/client";
import { beneficiaryRouter } from "./routers/beneficiary";
import { caseRouter } from "./routers/case";
import { taskRouter } from "./routers/task";
import { noteRouter } from "./routers/note";
import { activityRouter } from "./routers/activity";
import { notificationRouter } from "./routers/notification";

export const appRouter = createRouter({
  auths: authRouter,
  user: userRouter,
  client: clientRouter,
  beneficiary: beneficiaryRouter,
  case: caseRouter,
  address: addressRouter,
  task: taskRouter,
  note: noteRouter,
  activity: activityRouter,
  notification: notificationRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);


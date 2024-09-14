import { useScheduler } from "#scheduler";
import { prunedExpiredAuthSessions } from "~/server/database/repositories/auth";

export default defineNitroPlugin(() => {
  const scheduler = useScheduler();

  scheduler.run(async () => await prunedExpiredAuthSessions()).dailyAt(0, 0);
  scheduler.run(async () => await prunedExpiredAuthSessions()).dailyAt(0, 0);
});

import { sendMail } from "~/server/services/email";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await sendMail({
    to: "perso@maesloic.fr",
    subject: "Test de mails",
    template: {
      html: "",
      text: body?.content ?? "Hello World!",
    },
  });
});

// noinspection TypeScriptCheckImport
import { useMailer } from "#mailer";
import type { EmailRequest } from "~/types/email";

export async function sendMail(request: EmailRequest) {
  const config = useRuntimeConfig();

  const mailer = useMailer();
  const transporter = mailer.customTransporter({
    auth: {
      user: config.mailerUser,
      pass: config.mailerPass,
    },
    host: config.mailerHost,
    port: parseInt(config.mailerPort as string),
    secure: true,
  });

  return mailer.sendMail({
    transporter,
    requestId: "test-key",
    options: {
      fromEmail: config.mailerFromAddress,
      fromName: config.mailerFromName,
      subject: request.subject,
      to: request.to,
      html: request.template.html,
      text: request.template.text,
    },
  });
}

import { Resend } from "resend";

const FROM_ADDRESS = "Hublr <notifications@wearehublr.com>";

export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
  } catch {
    // Email delivery is a nice-to-have, never block the calling action on it.
  }
}

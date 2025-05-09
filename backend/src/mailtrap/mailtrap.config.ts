import { MailtrapClient } from "mailtrap";
import "dotenv/config";

export const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN as string,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

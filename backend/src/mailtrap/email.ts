import { client, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<any> => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email send succesfully!", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error when sending verification email ${error}`);
  }
};

export const sendWelcomeEmail = async (
  email: string,
  username: string
): Promise<any> => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "e6a3bf2d-02d2-46a4-a71c-d52be37c261c",
      template_variables: {
        company_info_name: "Auth Company",
        first_name: username,
      },
    });

    console.log("Welcome email sent successfully!", response);
  } catch (error) {
    console.log("Error when sending welcome email");
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

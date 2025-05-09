import { client,sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email:string, verificationToken:string): Promise <any> => {
    const recipient = [{email}];

    try {
        const response = await client.send({
            from: sender,
            to:recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"

        })
        console.log("Email send succesfully!", response);
    } catch (error) {
        console.error("Error sending verification email", error)
        throw new Error(`Error when sending verification email ${error}`)
    }
}
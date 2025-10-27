import nodemailer from "nodemailer";
import { InferenceClient } from "@huggingface/inference";

export const sendMail = async (to, subject, content, fromTitle = "NK College Management") => {
  try {
    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    let finalContent = content;

    if (!content) {
      const chatCompletion = await client.chatCompletion({
        model: "zai-org/GLM-4.6",
        messages: [
          {
            role: "user",
            content: `Write only valid HTML for an email template.
                        Do NOT include explanations, markdown, or code blocks.
                        The HTML should be a friendly welcome email for registered user.
                        Mention features like managing profile, viewing classes, and connecting with faculty dont mention any buttons.
                        End with "Thanks, ${fromTitle}".
                        Output must contain only pure HTML (no extra text or comments).`,
          },
        ],
      });

      finalContent =
        chatCompletion?.choices?.[0]?.message?.content ||
        chatCompletion?.generated_text ||
        "<p>Welcome to NK College Management!</p>";

      console.log("AI Generated Email:", finalContent);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${fromTitle}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: finalContent,
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};

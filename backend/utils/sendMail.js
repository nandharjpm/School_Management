import nodemailer from "nodemailer";
import { InferenceClient } from "@huggingface/inference";

export const sendMail = async (
  to,
  subject,
  content = null,
  fromTitle = "NK College Management",
  user_role = null
) => {
  try {
    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
    let finalContent = content;

    if (!content) {
      const isStudent = parseInt(user_role) === 5;

      const prompt = isStudent
        ? `Write only valid HTML for an email template.
           Do NOT include explanations, markdown, or code blocks.
           The HTML should be a friendly welcome email for a new student user.
           Mention features like managing profile, viewing classes, and connecting with faculty. 
           Do not mention any buttons or links.
           End with "Thanks, ${fromTitle}".
           Output must contain only pure HTML (no extra text or comments).`
        : `Write only valid HTML for an email template.
           Do NOT include explanations, markdown, or code blocks.
           The HTML should be a friendly welcome email for College Staff.
           Mention features like managing profile, viewing classes, and managing student details.
           Do not mention any buttons or links.
           End with "Thanks, ${fromTitle}".
           Output must contain only pure HTML (no extra text or comments).`;

      const chatCompletion = await client.chatCompletion({
        model: "zai-org/GLM-4.6",
        messages: [{ role: "user", content: prompt }],
      });

      finalContent =
        chatCompletion?.choices?.[0]?.message?.content ||
        chatCompletion?.generated_text ||
        `<p>Welcome to NK College Management!</p><p>Thanks, ${fromTitle}</p>`;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"${fromTitle}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: finalContent,
      headers: {
        "X-Unique-Header": new Date().getTime().toString(), // prevents Gmail threading
      },
    });

    console.log(`Email sent successfully to ${to} | Subject: ${subject}`);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};

import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, content, fromTitle="School Management") => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"${fromTitle}" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: content
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
    }catch(err){
        console.error("Error sending email", err);
    }
}
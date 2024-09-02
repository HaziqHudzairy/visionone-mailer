import transporter from "@/utils/mailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: Request) {
    if (req.headers.get("x-auth") !== process.env.EMAIL_PASS) {
        return new Response(
            JSON.stringify({ message: "Nice try kiddo" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const { subject, name, email, message: inquiryMessage } = await req.json();

    const message: Mail.Options = {
        from: `"${name}" <inquiries@visionone.com.my>`,
        to: "haziq.huzairi11@gmail.com",
         subject: "Contact Form Email Vision One Website",
        text: `You have a new message from your contact form:\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Subject: ${subject}\n` +
              `Message:\n${inquiryMessage}`,
        html: `<p>You have a new message from your contact form:</p><br>` +
              `<p><strong>Name:</strong> ${name}</p>` +
              `<p><strong>Email:</strong> ${email}</p>` +
              `<p><strong>Subject:</strong> ${subject}</p>` +
              `<p><strong>Message:</strong></p><p>${inquiryMessage}</p>`,
    };

    try {
        await transporter.sendMail(message);
        return new Response(
            JSON.stringify({ message: "Email sent." }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Failed to send email:", error);
        return new Response(
            JSON.stringify({ message: "Failed to send email." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

import transporter from "@/utils/mailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: Request) {

    if (req.headers.get("x-auth") !== process.env.EMAIL_PASS) {
        return Response.json(
            { status: 400, body: { message: "Nice try kiddo" } },
            {
                status: 400,
            }
        );
    }

    const { subject, name, email, message: inquiryMessage } = await req.json();

    const message: Mail.Options = {
        from: "inquiries@visionone.com.my",
        to: "haziq.huzairi11@gmail.com",
        subject,
        text:
            `You have a new message from your contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n` +
            `Message:\n${inquiryMessage}`,
        html:
            `<p>You have a new message from your contact form:</p><br>` +
            `<p><strong>Name:</strong> ${name}</p>\n` +
            `<p><strong>Email:</strong> ${email}</p>\n` +
            `<p><strong>Subject:</strong> ${subject}</p>\n` +
            `<p><strong>Message:</strong></p><p>${inquiryMessage}</p>`,
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
            return Response.json(
                { status: 500, body: { message: "Failed to send email." } },
                {
                    status: 500,
                }
            );
        }
    });

    return Response.json({ status: 200, body: { message: "Email sent." } });
}

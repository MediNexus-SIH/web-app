import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password
  },
});

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();
  // Validate the email address from the form
  const recipientEmail = process.env.RECIPIENT_EMAIL; // Default recipient
  const senderEmail = email; // Email from form

  try {
    await transporter.sendMail({
      from: senderEmail, // Use the email address provided in the form
      to: recipientEmail, // Default recipient's email address
      subject: `Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}

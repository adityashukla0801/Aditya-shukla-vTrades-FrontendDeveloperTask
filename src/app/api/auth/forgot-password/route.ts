// app/api/send-otp/route.ts
import { saveOtp } from "@/lib/otpStore";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("If Email is not comming you can get it on the console::", otp);
  saveOtp(email, otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"No Reply" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });

  return Response.json({ message: "OTP sent on Email" });
}

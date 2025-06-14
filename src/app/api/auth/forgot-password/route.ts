import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  const { error } = await supabase.from("otps").upsert({
    email,
    otp,
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("Supabase error:", error.message);
    return new Response(JSON.stringify({ error: "Failed to store OTP" }), {
      status: 500,
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    return Response.json({ message: "OTP sent on email" });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}

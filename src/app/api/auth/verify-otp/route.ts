// app/api/verify-otp/route.ts
import { getOtp, deleteOtp } from "@/lib/otpStore";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = getOtp(email);
  if (!record) {
    return new Response(JSON.stringify({ error: "OTP not found" }), {
      status: 400,
    });
  }

  if (record.otp !== otp) {
    return new Response(JSON.stringify({ error: "Invalid OTP" }), {
      status: 400,
    });
  }

  if (Date.now() > record.expiresAt) {
    return new Response(JSON.stringify({ error: "OTP expired" }), {
      status: 400,
    });
  }

  deleteOtp(email);

  return Response.json({
    message: "OTP verified",
    email, // <- Include email so frontend can use it
  });
}

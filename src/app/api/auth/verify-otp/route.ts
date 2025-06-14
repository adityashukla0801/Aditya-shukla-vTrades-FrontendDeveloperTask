import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return new Response(
      JSON.stringify({ error: "Email and OTP are required" }),
      {
        status: 400,
      }
    );
  }
  const { data, error } = await supabase
    .from("otps")
    .select("otp, expires_at")
    .eq("email", email)
    .order("created_at", { ascending: false }) // Sort by most recent
    .limit(1) // Only take the latest one
    .maybeSingle(); // Avoid throwing if no result

  if (error || !data) {
    return new Response(JSON.stringify({ error: "OTP not found" }), {
      status: 400,
    });
  }

  if (data.otp !== otp) {
    return new Response(JSON.stringify({ error: "Invalid OTP" }), {
      status: 400,
    });
  }

  // Delete OTP after successful verification
  await supabase.from("otps").delete().eq("email", email);

  return Response.json({
    message: "OTP verified",
    email,
  });
}

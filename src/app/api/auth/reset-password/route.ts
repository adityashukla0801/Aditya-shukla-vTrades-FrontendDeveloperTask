import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, newPassword } = await req.json();

  if (!email || !newPassword) {
    return new Response(
      JSON.stringify({ error: "Email and new password required" }),
      {
        status: 400,
      }
    );
  }

  const { data, error } = await supabase
    .from("users")
    .update({ password: newPassword })
    .eq("email", email)
    .select("email")
    .single();

  if (error || !data) {
    return new Response(
      JSON.stringify({ error: "User not found or update failed" }),
      {
        status: 404,
      }
    );
  }

  return Response.json({ message: "Password updated successfully" });
}

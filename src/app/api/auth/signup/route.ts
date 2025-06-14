import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password }]);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return Response.json({ message: "Signup successful", user: data });
}

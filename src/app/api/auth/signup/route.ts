import { addUser, getUser } from "@/lib/store";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (getUser(email)) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
    });
  }
  addUser({ email, password });
  return Response.json({ message: "Signup successful" });
}

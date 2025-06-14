// app/api/reset-password/route.ts
import { getUsers } from "@/lib/store";
import { writeFileSync } from "fs";

export async function POST(req: Request) {
  const { email, newPassword } = await req.json();

  const users = getUsers();
  const index = users.findIndex((u) => u.email === email);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  users[index].password = newPassword;
  writeFileSync("data.json", JSON.stringify(users));

  return Response.json({ message: "Password updated successfully" });
}

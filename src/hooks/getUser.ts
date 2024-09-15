import { getServerSession } from "next-auth";
export async function getUser() {
  const session = await getServerSession();
  return session;
}

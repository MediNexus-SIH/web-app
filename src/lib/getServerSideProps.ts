import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getServerSideProps() {
  const session = await getServerSession(options);

  if (!session) {
    return {
      sessionStatus: false,
    };
  }

  return {
    sessionStatus:true,
    user:session
  };
}

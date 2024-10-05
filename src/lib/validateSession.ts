import { getServerSideProps } from "../hooks/getServerSideProps";

export default async function validateSession() {
  const session = await getServerSideProps();
  if (!session || !session.user) {
    return { error: "Unauthorized", status: 401 };
  }
  const { id: userId, hospitalName,email } = session.user.user;
  if (!userId || !hospitalName) {
    return { error: "Invalid session data", status: 401 };
  }
  return { userId, hospitalName, email };
}

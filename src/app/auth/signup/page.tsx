import { getServerSideProps } from "@/lib/getServerSideProps";
import MainPage from "./MainPage";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSideProps();
  if(session.sessionStatus){
    redirect("/dashboard")
  }
  return <MainPage />;
};

export default page;

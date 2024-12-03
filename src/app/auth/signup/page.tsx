import { getServerSideProps } from "@/lib/getServerSideProps";
import { redirect } from "next/navigation";
import MainPage from "./MainPage";

const page = async () => {
  const session = await getServerSideProps();
  if(session.sessionStatus){
    redirect("/dashboard")
  }
  return <MainPage />;
};

export default page;

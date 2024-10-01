import { getServerSideProps } from "@/hooks/getServerSideProps";
import MainPage from "./MainPage";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSideProps();
  console.log(session)
  if(session.sessionStatus){
    redirect("/dashboard")
  }
  return <MainPage />;
};

export default page;

import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { getServerSideProps } from "@/hooks/getServerSideProps";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSideProps();
  console.log(session)
  if (!session.sessionStatus) {
    redirect("/auth/signin");
  }
  return (
    <div className="min-h-screen">
      <div className="flex-1 flex flex-col">
        <TopBar className="w-full" />
        <div className="flex ">
          <Sidebar className="" />
          {children}
        </div>
      </div>
    </div>
  );
}

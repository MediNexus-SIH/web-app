import StickySideBar from "@/components/StickySideBar";
import TopBar from "@/components/TopBar";
import { getServerSideProps } from "@/lib/getServerSideProps";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSideProps();
  console.log(session.user)
  if (!session.sessionStatus) {
    redirect("/auth/signin");
  }
  return (
    <div className="min-h-screen">
      <div className="flex-1 flex flex-col">
        <TopBar className="w-full" />
        <div className="flex ">
          <StickySideBar className="" />
          {children}
        </div>
      </div>
    </div>
  );
}

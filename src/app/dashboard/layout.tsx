import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className="flex-1 flex flex-col">
        <TopBar className="w-full"/>
        <div className="flex ">
          <Sidebar className="" />
          {children}
        </div>
      </div>
    </div>
  );
}


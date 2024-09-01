import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className=" flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="text-xs text-muted-foreground">
        &copy; 2024 Hospital Management System. All rights reserved.
      </div>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/terms"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default FooterSection;

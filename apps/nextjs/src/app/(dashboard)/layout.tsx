import { Axiom } from "@haxiom/ui/icons";
import Link from "next/link";
import { UserDropdown } from "./_components/user-dropdown"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <nav className="sticky top-0 bg border-b">
          <div className="flex items-center justify-between h-12 max-w-6xl mx-auto px-4">
            <div className="flex gap-4">
              <Axiom className="h-6 w-6" />

              <Link className="" href={"datasets"}>
                Datasets
              </Link>
              <Link className="" href={"datasets"}>
                Stream
              </Link>
            </div>
            <div className="gap-4">
              <div className="bg-gray-6 w-px h-full" />

               <UserDropdown />
            </div>
          </div>
        </nav>
      </div>
      {children}
    </>
  );
}

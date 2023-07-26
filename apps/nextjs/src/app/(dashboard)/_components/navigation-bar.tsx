"use client";

import { Axiom } from "@haxiom/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { cn } from "@haxiom/ui";

const NAV_ITEMS = [
  {
    label: "Datasets",
    href: "datasets",
  },
  {
    label: "Stream",
    href: "stream",
  },
  {
    label: "Explore",
    href: "explore",
  },
  {
    label: "Dashboards",
    href: "dashboards",
  },
  {
    label: "Monitors",
    href: "monitors",
  },
];

export const NavigationBar = () => {
  const pathname = usePathname();

  /**
   * Assuming the first path segment is the top-level path
   * in Axiom proper, this would be false as the first path
   * segment is orgId.
   */
  const topLevelPath = pathname.split("/")[1];

  return (
    <nav className="sticky top-0 bg border-b">
      <div className="flex justify-between h-12 max-w-6xl mx-auto px-4">
        <div className="flex items-center h-full">
          <Link
            href={"/"}
            className="hover:bg-element-hover h-full px-2 -ml-2 block flex items-center"
          >
            <Axiom className="h-6 w-6" />
          </Link>

          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              className={cn(
                "hover:bg-element-hover h-full px-2 block flex items-center border-b -mb-px",
                topLevelPath === href
                  ? "border-b-gray-11"
                  : "border-transparent",
              )}
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 items-center h-full">
          <Separator />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

const Separator = () => <div className="bg-gray-6 w-px my-2 h-full" />;

"use client";

import { Axiom, ChevronDown, Settings } from "@haxiom/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { cn } from "@haxiom/ui";
import { MOCK_CURRENT_ORG, OrgSelect } from "./organization-select";
import { DropdownMenuTrigger } from "@haxiom/ui/dropdown-menu";

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
            className="hover:bg-element-hover focus:bg-element-hover focus-visible:ring-offset-0 h-full px-2 -ml-2 block flex items-center"
          >
            <Axiom className="h-6 w-6" />
          </Link>

          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              className={cn(
                "hover:bg-element-hover focus:bg-element-hover focus-visible:ring-offset-0 h-full px-2 block flex items-center border-b -mb-px",
                topLevelPath === href
                  ? "border-b-gray-11"
                  : "border-transparent",
              )}
              href={href}
            >
              {label}
            </Link>
          ))}

          <Separator />

          <Link
            href={"/settings"}
            className="hover:bg-element-hover focus:bg-element-hover focus-visible:ring-offset-0 h-full px-2 block flex items-center"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex items-center h-full">
          <Separator />
          <OrgSelect>
            <DropdownMenuTrigger className="flex hover:bg-element-hover focus:bg-element-hover focus-visible:ring-offset-0 data-[state=open]:bg-element-hover h-full px-2 items-center">
               {MOCK_CURRENT_ORG?.name} <ChevronDown className="h-4 w-4 mt-1" />
            </DropdownMenuTrigger>
            </OrgSelect>
          <UserDropdown className="hover:bg-element-hover focus:bg-element-hover focus-visible:ring-offset-0 data-[state=open]:bg-element-hover h-full px-2 -mr-2" />
        </div>
      </div>
    </nav>
  );
};

const Separator = () => <div className="bg-gray-6 w-px my-2 h-full" />;

import type { ReactNode } from "react";

import * as Icons from "@haxiom/ui/icons";

import { SiteFooter } from "~/components/footer";
import { MobileDropdown } from "~/components/mobile-nav";
import { siteConfig } from "~/app/config";

export default function MarketingLayout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="container z-50 flex h-16 items-center border-b bg">
        <div className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </div>
        <MobileDropdown />
        <div className="ml-auto flex items-center space-x-4">
          Dashboard Link
        </div>
      </nav>

      <main className="flex-1">{props.children}</main>
      <SiteFooter />
    </div>
  );
}

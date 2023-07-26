import { cn } from "@haxiom/ui";
import type { ReactNode } from "react";
import { MAX_WIDTH_CLASS } from "../_constants";

export const TopToolBar = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="h-16 border-b">
      <div className={cn("flex h-full items-center", MAX_WIDTH_CLASS)}>
        {children}
      </div>
    </div>
  );
};

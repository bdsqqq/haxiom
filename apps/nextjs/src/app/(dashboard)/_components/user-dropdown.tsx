"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@haxiom/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@haxiom/ui/dropdown-menu";
import { Check, User } from "@haxiom/ui/icons";
import { toast } from "@haxiom/ui/use-toast";
import { useTheme } from "next-themes";
import Link from "next/link";

export const UserDropdown = ({className}: {className: string}) => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-transparent">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <span>Light</span>
            {theme === "light" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <span>Dark</span>
            {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <span>System</span>
            {theme === "system" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="settings/profile">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            toast({
              title: "Pretend you're logged out",
              description:
                "I didn't implement auth lol, this is a frontend demo.",
            });
          }}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

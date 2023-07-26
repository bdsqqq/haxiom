import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@haxiom/ui/dropdown-menu";
import { toast } from "@haxiom/ui/use-toast";
import type { ReactNode } from "react";

const MOCK_ORGS = [
   {
      id: "axiomers-auhe",
      name: "Axiomers",
   },
   {
      id: "hej-do-jj3l",
      name: "Hej do",
   },
]

export const MOCK_CURRENT_ORG = MOCK_ORGS[0];

/**
 * Provide a DropdownMenuTrigger as a child to this component.
 */
export const OrgDropdown = ({children}:{children: ReactNode}) => {
      return (
         <DropdownMenu>
            {children}
           <DropdownMenuContent align="end" side="bottom">
             <DropdownMenuGroup>
               <DropdownMenuLabel>{MOCK_ORGS.length} Organizations</DropdownMenuLabel>
               {MOCK_ORGS.map((org) => (
                  <DropdownMenuCheckboxItem checked={MOCK_CURRENT_ORG?.id === org.id} key={org.id} onClick={() => {
                     toast({
                       title: "Pretend you switched orgs",
                       description:
                         "If you're seeing this, I didn't get through all my TODOs.",
                     });
                   }}>
                  {org.name}
                </DropdownMenuCheckboxItem>
               ))}
             </DropdownMenuGroup>
             <DropdownMenuSeparator />
             <DropdownMenuItem onClick={() => {
                     toast({
                       title: "Pretend you're in the org creation flow now",
                       description:
                         "If you're seeing this, I didn't get through all my TODOs.",
                     });
                   }}>
               Create Organization
             </DropdownMenuItem>
             </DropdownMenuContent>
         </DropdownMenu>
       );
}
import { Sheet, SheetContent, SheetTitle } from '@haxiom/ui/sheet';
import type { ReactNode } from 'react';

/**
 * Provide a SheetTrigger as a child to this component.
 */
export const ManageNotifiersSheet = ({ children }: { children?: ReactNode }) => {
  return (
    <Sheet>
      {children}
      <SheetContent>
        <SheetTitle>Manage notifiers</SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

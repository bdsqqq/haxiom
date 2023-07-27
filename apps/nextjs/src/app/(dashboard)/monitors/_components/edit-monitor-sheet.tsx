import { Sheet, SheetContent, SheetTitle } from '@haxiom/ui/sheet';
import type { ReactNode } from 'react';

/**
 * Provide a SheetTrigger as a child to this component.
 */
export const EditMonitorSheet = ({ children }: { children?: ReactNode }) => {
  return (
    <Sheet>
      {children}
      <SheetContent>
        <SheetTitle>Edit monitor</SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

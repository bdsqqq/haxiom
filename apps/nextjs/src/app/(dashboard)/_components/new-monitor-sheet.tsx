'use client';

import { Sheet, SheetClose, SheetContent, SheetTitle } from '@haxiom/ui/sheet';
import type { ReactNode } from 'react';
import { Label } from '@haxiom/ui/label';
import { Input, TextArea } from '@haxiom/ui/input';
import { Button } from '@haxiom/ui/button';
import { mockAction } from '../_utils';

/**
 * Provide a SheetTrigger as a child to this component.
 */
export const NewMonitorSheet = ({ children }: { children?: ReactNode }) => {
  return (
    <Sheet>
      {children}
      <SheetContent>
        <SheetTitle>New Monitor</SheetTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mockAction('Created a monitor');
          }}
          className="flex flex-col gap-4"
        >
          <fieldset>
            <Label htmlFor="name">Name</Label>
            <Input className="ring-offset-0" id="name" placeholder="Triangle sells..." />
          </fieldset>

          <fieldset>
            <Label htmlFor="name">Description</Label>
            <TextArea
              className="ring-offset-0 resize-none"
              id="name"
              placeholder="keep track of how many people buy triangles from the Triangle company..."
            />
          </fieldset>

          <div className="flex justify-between flex-row-reverse w-full">
            <Button type="submit">Create</Button>

            <SheetClose asChild>
              <Button
                options={{
                  variant: 'outline',
                }}
                type="button"
              >
                Cancel
              </Button>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@haxiom/ui/dialog";
import type { ReactNode } from "react";
import { Label } from "@haxiom/ui/label";
import { Input } from "@haxiom/ui/input";
import { Button } from "@haxiom/ui/button";
import { toast } from "@haxiom/ui/use-toast";

/**
 * Provide a DialogTrigger as a child to this component.
 */
export const NewOrganizationDialog = (
  { children }: { children?: ReactNode },
) => {
  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogTitle>New Organization</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast({
              title: "Pretend you created an org",
              description:
                "If you're seeing this, I didn't get through all my TODOs.",
            });
          }}
          className="flex flex-col gap-4"
        >
          <fieldset>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Triangle company..." />
          </fieldset>

          <div className="flex justify-between flex-row-reverse w-full">
            <Button type="submit">
              Create
            </Button>

            <DialogClose asChild>
              <Button
                options={{
                  variant: "outline",
                }}
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

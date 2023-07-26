"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Button } from "./button";
import { cn } from "./utils/cn";
import type { VariantProps} from "class-variance-authority";
import { cva } from "class-variance-authority";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center md:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "bg/60 fixed inset-0 z-50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// TODO: Make this typesafe eg: when "modal" is selected, "side" is not available
const dialogContentVariants = cva(
  [
    "fixed z-50 grid gap-4 border border-subtle bg p-6 shadow-lg animate-in",
    "data-[state=open]:fade-in-90 md:max-w-lg duration-moderate-01 data-[state=open]:ease-productive-entrance",
  ],
  {
    variants: {
      variant: {
        drawer: "",
        modal: "bottom-0 rounded-t-lg data-[state=open]:slide-in-from-bottom-10 data-[state=open]:md:slide-in-from-bottom-0 md:zoom-in-90 w-full md:rounded-lg md:bottom-auto",
      },
      side: {
        left: "",
        right: "",
      }
    },
    compoundVariants: [
      {
        variant: "drawer",
        side: "left",
        class: "left-0 h-full min-w-[300px] max-w-full rounded-r-lg md:max-w-md data-[state=open]:slide-in-from-left-10 border-l-transparent",
      },
      {
        variant: "drawer",
        side: "right",
        class: "right-0 h-full min-w-[300px] max-w-full rounded-l-lg md:max-w-md data-[state=open]:slide-in-from-right-10 border-r-transparent",
      },
    ],
    defaultVariants: {
      variant: "modal",
      side: "right",
    }
  },
);       

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  options?: VariantProps<typeof dialogContentVariants>;
}

/**
 * On mobile, dialogs will always be drawers.
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, options, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        dialogContentVariants(options),
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close asChild>
        <Button options={{
          variant: "ghost",
          size: "icon",
        }}
          className={cn(
            "absolute top-4 right-4"
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-subtle text-sm", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogClose = DialogPrimitive.Close;

export {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

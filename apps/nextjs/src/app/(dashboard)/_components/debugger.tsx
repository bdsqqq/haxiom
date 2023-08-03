'use client';

import { Button } from '@haxiom/ui/button';
import { Settings } from '@haxiom/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@haxiom/ui/popover';

import { create } from 'zustand';

interface DebugState {
  hasABunchOfAccesses: boolean;
  toggle: () => void;
}

export const useDebugStore = create<DebugState>((set) => ({
  hasABunchOfAccesses: true,
  toggle: () => set((state) => ({ hasABunchOfAccesses: !state.hasABunchOfAccesses })),
}));

export function Debugger() {
  const { hasABunchOfAccesses, toggle } = useDebugStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          options={{
            size: 'icon',
            variant: 'outline',
          }}
          className="opacity-0 hover:opacity-100 focus:opacity-100 fixed bottom-4 right-4 data-[state=open]:opacity-100 z-50"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="flex flex-col p-4">
        <div className="flex gap-2 items-center">
          Has a bunch of accesses: {hasABunchOfAccesses ? 'true' : 'false'}
          <Button onClick={toggle}>Toggle</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

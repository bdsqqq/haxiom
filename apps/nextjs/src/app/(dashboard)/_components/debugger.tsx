'use client';

import { Button } from '@haxiom/ui/button';
import { Checkbox } from '@haxiom/ui/checkbox';
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
        <ABunchOfAccessesToggler />
      </PopoverContent>
    </Popover>
  );
}

const ABunchOfAccessesToggler = () => {
  const { hasABunchOfAccesses, toggle } = useDebugStore();

  return (
    <div className="flex gap-2 items-center">
      <Checkbox checked={hasABunchOfAccesses} onClick={toggle} />
      Has a bunch of accesses
    </div>
  );
};

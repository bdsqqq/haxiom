'use client';

import { Button } from '@haxiom/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@haxiom/ui/dropdown-menu';
import { Separator } from '@haxiom/ui/separator';
import { ChevronDown } from '@haxiom/ui/icons';
import type { ReactNode } from 'react';
import { mockAction } from '~/app/(dashboard)/_utils';

export const AplEditorMock = () => {
  return (
    <div className="border">
      <div className="bg-element h-48"></div>
      <div className="flex justify-between py-3.5 px-4 bg-element-hover border-t">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2">
          <Button
            options={{
              variant: 'outline',
            }}
            onClick={() => {
              mockAction('Cleared');
            }}
          >
            Clear
          </Button>
          <div className="flex">
            <Button
              onClick={() => {
                mockAction('Ran the query');
              }}
              className="rounded-r-none"
            >
              Run Query
            </Button>
            <Separator orientation="vertical" className="bg-gray-11 h-auto" />
            <AditionalActionsDropdown>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-l-none h-auto">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
            </AditionalActionsDropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const ADITIONAL_ACTIONS = [
  {
    infinitive: 'Save Query',
    past: 'Saved Query',
  },
  {
    infinitive: 'Add to dashboard',
    past: 'Added to dashboard',
  },
  {
    infinitive: 'Create monitor from chart',
    past: 'Created monitor from chart',
  },
  {
    infinitive: 'Copy link to query',
    past: 'Copied link to query',
  },
  {
    infinitive: 'Copy link to result',
    past: 'Copied link to result',
  },
  {
    infinitive: 'Download as JSON',
    past: 'Downloaded as JSON',
  },
];

/**
 * Provide a DropdownMenuTrigger as a child to this component.
 */
const AditionalActionsDropdown = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu>
      {children}
      <DropdownMenuContent align="end">
        {ADITIONAL_ACTIONS.map((action) => (
          <DropdownMenuItem onClick={() => mockAction(action.past)} key={action.infinitive}>
            {action.infinitive}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

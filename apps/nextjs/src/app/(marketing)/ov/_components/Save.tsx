import { cn } from '@haxiom/ui';
import { Button } from '@haxiom/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@haxiom/ui/tooltip';

interface SaveProps {
  className?: string;
}

export const Save = ({ className }: SaveProps) => {
  // debug stupid tooltip
  // setTimeout(() => { debugger; }, 1000);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>💾</Button>
        </TooltipTrigger>
        <TooltipContent options={{ size: 'md' }}>
          <p className={cn(className, 'text-gray-12')}>Save</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

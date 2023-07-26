'use client';
import { Button } from '@haxiom/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@haxiom/ui/popover';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from '@haxiom/ui/button';
import { cn } from '@haxiom/ui';

export const runtime = 'edge';

export default function Home() {
  return (
    <main className="">
      <div className="flex h-full min-h-screen w-full flex-row items-center justify-center gap-4">
        {/* issue with light and dark support, what about absolutely positioned el's that don't have a parent w light or dark? */}
        <div className="dark p-12 bg-gray-1">
          <FakeTimeRanger dark />
        </div>

        <div className="light p-12 bg-gray-1">
          <FakeTimeRanger />
        </div>
      </div>
    </main>
  );
}

const FakeTimeRanger = ({ dark = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="gap-2" options={{ size: 'sm', variant: 'outline' }}>
          <ClockSVG />
          Jul 10, 12:20 PM - Jul 10, 12:20 PM
          <DownSVG />
        </Button>
      </PopoverTrigger>
      <PopoverContent options={{}}>
        <FakeMenu className={dark ? 'dark' : 'light'} />
      </PopoverContent>
    </Popover>
  );
};

type CalendarProps = React.ComponentProps<typeof DayPicker>;

const FakeMenu = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => {
  const rn = new Date();

  return (
    <div className={cn(className, 'w-full bg-gray-4')}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        defaultMonth={rn}
        className={cn('p-3')}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-gray-12',
          month: 'space-y-4',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'font-medium',
          nav: 'space-x-1 flex items-center',
          nav_button: cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          ),
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: '',
          head_cell: 'text-gray-12 rounded-md w-9 font-normal',
          row: 'w-full mt-2',
          cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day: cn(buttonVariants({ variant: 'ghost', size: 'sm' })),
          day_selected: 'bg-primary text-gray-1 hover:bg-primary hover:text-gray-1 focus:bg-primary focus:text-gray-1',
          day_today: 'bg-accent text-gray-1',
          day_outside: 'text-gray-1 opacity-50',
          day_disabled: 'text-gray-1 opacity-50',
          day_range_middle: 'aria-selected:bg-accent aria-selected:text-gray-1d',
          day_hidden: 'invisible',
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
};

const ClockSVG = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="clock"
    className="overflow-visible box-content w-3 h-[1em] ml-[0.5em] items-center align-middle"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M240 112C240 103.2 247.2 96 256 96C264.8 96 272 103.2 272 112V247.4L360.9 306.7C368.2 311.6 370.2 321.5 365.3 328.9C360.4 336.2 350.5 338.2 343.1 333.3L247.1 269.3C242.7 266.3 239.1 261.3 239.1 256L240 112zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM32 256C32 379.7 132.3 480 256 480C379.7 480 480 379.7 480 256C480 132.3 379.7 32 256 32C132.3 32 32 132.3 32 256z"
    ></path>
  </svg>
);
const DownSVG = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="chevron-down"
    className="overflow-visible box-content w-3 h-[1em] ml-[0.5em] items-center align-middle"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M4.251 181.1C7.392 177.7 11.69 175.1 16 175.1c3.891 0 7.781 1.406 10.86 4.25l197.1 181.1l197.1-181.1c6.5-6 16.64-5.625 22.61 .9062c6 6.5 5.594 16.59-.8906 22.59l-208 192c-6.156 5.688-15.56 5.688-21.72 0l-208-192C-1.343 197.7-1.749 187.6 4.251 181.1z"
    ></path>
  </svg>
);

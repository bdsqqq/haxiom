'use client';
import { Button } from '@haxiom/ui/button';
import { Popover, PopoverContent, PopoverContent2, PopoverTrigger } from '@haxiom/ui/popover';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from '@haxiom/ui/button';
import { cn } from '@haxiom/ui';

export const runtime = 'edge';

export default function Home() {
  return (
    <section className="min-h-screen w-full">
      <div className="m-auto flex h-full w-fit flex-col items-center justify-center gap-4">
        <div className="flex h-full w-full flex-row items-center justify-center gap-4">
          {/* issue with light and dark support, what about absolutely positioned el's that don't have a parent w light or dark? */}
          <div className="dark p-12 bg-gray-1">
            <FakeTimeRanger dark />
          </div>

          <div className="light p-12 bg-gray-1">
            <FakeTimeRanger />
          </div>
        </div>

        <div className="flex h-full w-full flex-row items-center justify-center gap-4">
          <div className="dark p-12 w-full bg-gray-1">
            <FakeTimeRanger2 dark />
          </div>

          <div className="light p-12 w-full bg-gray-1">
            <FakeTimeRanger2 />
          </div>
        </div>
      </div>
    </section>
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

const FakeTimeRanger2 = ({ dark = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="gap-2" options={{ size: 'sm', variant: 'outline' }}>
          Edit
        </Button>
      </PopoverTrigger>
      {/* alternative is to declare radix stuff here and not as a part of the options */}
      <PopoverContent2 options={{ size: 'full' }} side="top" align="start">
        <FakeMenu2 className={dark ? 'dark' : 'light'} />
      </PopoverContent2>
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

interface FakeMenu2Props {
  className: string | undefined;
}

const FakeMenu2 = ({ className, ...props }: FakeMenu2Props) => {
  return (
    <div className={cn(className, 'flex items-center rounded p-1')} {...props}>
      <Button options={{ variant: 'outline' }}>
        {/* should we add fill to button? */}
        <PencilSVG />
      </Button>

      <Button options={{ variant: 'outline' }}>
        <LayerSVG />
      </Button>

      <Button options={{ variant: 'outline' }}>
        <TrashSVG />
      </Button>
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

const PencilSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-14">
    <path
      d="M13.6691 6.94923L7.29591 13.6872C7.10702 13.8869 6.84428 14 6.56941 14L3.66668 14C3.11439 14 2.66668 13.5523 2.66668 13L2.66668 10.0717C2.66668 9.81193 2.76774 9.56238 2.94848 9.37583L9.38784 2.72966C9.77214 2.33301 10.4052 2.323 10.8019 2.70731C10.8057 2.71097 10.8094 2.71467 10.8131 2.71839L13.6497 5.55496C14.0326 5.93782 14.0412 6.55587 13.6691 6.94923Z"
      fill="currentColor"
    ></path>
  </svg>
);
const LayerSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-14">
    <path
      opacity="0.3"
      d="M10.6638 3.99996H6.00002C4.89545 3.99996 4.00002 4.89539 4.00002 5.99996V10.6637C3.13459 10.6211 2.66669 10.1137 2.66669 9.21208V4.12117C2.66669 3.1783 3.17836 2.66663 4.12123 2.66663H9.21214C10.1138 2.66663 10.6211 3.13453 10.6638 3.99996Z"
      fill="currentColor"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.78786 5.33337H11.8788C12.8216 5.33337 13.3333 5.84505 13.3333 6.78792V11.8788C13.3333 12.8217 12.8216 13.3334 11.8788 13.3334H6.78786C5.84499 13.3334 5.33331 12.8217 5.33331 11.8788V6.78792C5.33331 5.84505 5.84499 5.33337 6.78786 5.33337Z"
      fill="currentColor"
    ></path>
  </svg>
);
const TrashSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-14">
    <path
      d="M4 5.33337H12L11.4044 13.0767C11.3643 13.5977 10.9298 14 10.4073 14H5.5927C5.07016 14 4.63572 13.5977 4.59564 13.0767L4 5.33337ZM5.33333 6.66671L5.63625 9.393L10.3679 9.35598L10.6667 6.66671H5.33333Z"
      fill="currentColor"
    ></path>
    <path
      opacity="0.3"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.33331 3V2.33333C9.33331 2.14924 9.18407 2 8.99998 2H6.99998C6.81588 2 6.66665 2.14924 6.66665 2.33333V3H3.66665C3.48255 3 3.33331 3.14924 3.33331 3.33333V3.66667C3.33331 3.85076 3.48255 4 3.66665 4H12.3333C12.5174 4 12.6666 3.85076 12.6666 3.66667V3.33333C12.6666 3.14924 12.5174 3 12.3333 3H9.33331Z"
      fill="currentColor"
    ></path>
  </svg>
);

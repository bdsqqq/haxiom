import { cn } from '@haxiom/ui';
import { MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS } from '~/app/(dashboard)/_constants';

export default function Page() {
  return (
    <main className={cn(MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS)}>
      <div className="grid gap-4 grid-cols-12">
        <div className="col-span-8 row-start-1 row-end-[4]">
          <div className="bg-element border h-full"></div>
        </div>
        <div className="col-span-4 col-end-13 row-span-1">
          <div className="bg-element border h-96"></div>
        </div>
        <div className="col-span-4 col-end-13 row-span-1">
          <div className="bg-element border h-96"></div>
        </div>
        <div className="col-span-4 col-end-13 row-span-1">
          <div className="bg-element border h-96"></div>
        </div>
      </div>
    </main>
  );
}

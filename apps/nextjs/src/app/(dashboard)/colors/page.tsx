import { cn } from '@haxiom/ui';
import { MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS } from '~/app/(dashboard)/_constants';
import {
  gray,
  grayA,
  blue,
  blueA,
  plum,
  plumA,
  red,
  redA,
  grass,
  grassA,
  amber,
  amberA,
  grayDark,
  grayDarkA,
  blueDark,
  blueDarkA,
  plumDark,
  plumDarkA,
  redDark,
  redDarkA,
  grassDark,
  grassDarkA,
  amberDark,
  amberDarkA,
} from '@radix-ui/colors';
import { ArrowRight } from '@haxiom/ui/icons';
import { Separator } from '@haxiom/ui/separator';

import { giveMeTheThingsForTheseScales } from '@haxiom/tailwind-config/qui-radix-bridge';

export default function Page() {
  return (
    <main className={cn(MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS, 'flex flex-col gap-4 h-full')}>
      <div className="shrink-0 bg-test-color flex flex-col gap-2">
        <Scales
          scales={[gray, grayA, blue, blueA, plum, plumA, red, redA, grass, grassA, amber, amberA]}
          darkScales={[
            grayDark,
            grayDarkA,
            blueDark,
            blueDarkA,
            plumDark,
            plumDarkA,
            redDark,
            redDarkA,
            grassDark,
            grassDarkA,
            amberDark,
            amberDarkA,
          ]}
        />
      </div>
      <div className="h-auto grid place-content-center w-full">
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 items-center justify-center">
            <div>{grayDark.gray1}</div>
            <ArrowRight size={16} />
          </div>
          <Separator />
          <div className="flex gap-2 items-center justify-center">
            <div>{grayDarkA.grayA1}</div>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </main>
  );
}

const Scales = ({ scales, darkScales }: { scales: Record<string, string>[]; darkScales: Record<string, string>[] }) => {
  const stuff = giveMeTheThingsForTheseScales({
    lightScales: scales,
    darkScales,
    prefix: 'qui',
    defaultScale: 'gray',
  });

  return (
    <pre className="bg-gray-base">
      <code>{JSON.stringify(stuff, null, 2)}</code>
    </pre>
  );
};

// const Scale = ({ scale }: { scale: Record<string, string> }) => {

//   return (
//     <div className="flex flex-col gap-2">
//       {convertedScale.map((color) => {
//         return (
//           <div key={color.key} className="flex gap-2 items-center">
//             <div className="w-8 h-8" style={{ backgroundColor: scaleWithDashes[color.key] }}></div>
//             <div>{color.key}</div>
//             <div>{color.color}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

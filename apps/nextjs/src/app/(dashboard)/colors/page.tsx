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
import { generateTailwindThemeData } from '@haxiom/tailwind-config/qui-radix-bridge';

const lightScales = [gray, grayA, blue, blueA, plum, plumA, red, redA, grass, grassA, amber, amberA];
const darkScales = [
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
];

export default function Page() {
  return (
    <main className={cn(MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS, 'flex flex-col gap-4 h-full')}>
      <div className="flex gap-8">
        <div className="shrink-0">
          <ScalesChips lightScales={lightScales} darkScales={darkScales} />
        </div>
        <div className="shrink-0 overflow-scroll">
          <Scales lightScales={lightScales} darkScales={darkScales} />
        </div>
      </div>
    </main>
  );
}

const Scales = ({
  lightScales,
  darkScales,
}: {
  lightScales: Record<string, string>[];
  darkScales: Record<string, string>[];
}) => {
  const stuff = generateTailwindThemeData({
    lightScales,
    darkScales,
    prefix: 'qui',
    defaultScale: 'gray',
  });

  return (
    <pre className="bg-gray-base relative">
      <code>{JSON.stringify(stuff, null, 2)}</code>
    </pre>
  );
};

const ScalesChips = ({
  lightScales,
  darkScales,
}: {
  lightScales: Record<string, string>[];
  darkScales: Record<string, string>[];
}) => {
  const stuff = generateTailwindThemeData({
    lightScales,
    darkScales,
    prefix: 'qui',
    defaultScale: 'gray',
  });

  return (
    <div className="flex flex-col">
      {Object.values(stuff.useInRootDark.darkScalesWithCSSCustomProperties).map((color) => (
        <div key={color} className="flex gap-2 items-center">
          <div className="w-8 h-8" style={{ backgroundColor: `hsl(${color.replace(';', '')})` }}></div>
          <div>{`hsl(${color.replace(';', '')})`}</div>
        </div>
      ))}
    </div>
  );
};

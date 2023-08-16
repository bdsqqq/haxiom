import { cn } from '@haxiom/ui';
import { MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS } from '~/app/(dashboard)/_constants';
import { grayDark, grayDarkA } from '@radix-ui/colors';
import { ArrowRight } from '@haxiom/ui/icons';
import { Separator } from '@haxiom/ui/separator';

const fromHSLtoJustValues = (color: string) => {
  const functionTransforms = {
    hsl: (value: string) => {
      const units = ['deg', '%', '%'];
      return value
        .replace('hsl(', '')
        .replace(')', '')
        .replace(/%/g, '')
        .split(',')
        .map((value, i) => value.trim() + (units[i] ?? ''))
        .join(' ');
    },
    hsla: (value: string) => {
      const units = ['deg', '%', '%'];
      const separators = ['', '', '/'];
      return value
        .replace('hsla(', '')
        .replace(')', '')
        .replace(/%/g, '')
        .split(',')
        .map((value, i) => value.trim() + (units[i] ?? '') + (separators[i] ? ` ${separators[i]}` : ''))
        .join(' ');
    },
  } as const;

  const possibleFunctions = Object.keys(functionTransforms) as (keyof typeof functionTransforms)[];

  const functionType = possibleFunctions.find((func) => color.startsWith(func + '('));
  if (!functionType) {
    throw new Error(`Unknown function type for color ${color}`);
  }

  return functionTransforms[functionType](color);
};

export default function Page() {
  return (
    <main className={cn(MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS, 'flex flex-col gap-4 h-full')}>
      <div className="shrink-0 flex gap-2">
        <div>
          <Scale scale={grayDark} />
        </div>
        <div>
          <Scale scale={grayDarkA} />
        </div>
      </div>
      <div className="h-auto grid place-content-center w-full">
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 items-center justify-center">
            <div>{grayDark.gray1}</div>
            <ArrowRight size={16} />
            <div>{fromHSLtoJustValues(grayDark.gray1)}</div>
          </div>
          <Separator />
          <div className="flex gap-2 items-center justify-center">
            <div>{grayDarkA.grayA1}</div>
            <ArrowRight size={16} />
            <div>{fromHSLtoJustValues(grayDarkA.grayA1)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

const Scale = ({ scale }: { scale: Record<string, string> }) => {
  return Object.entries(scale).map(([key, value]) => {
    return (
      <div key={key} className="flex gap-2 items-center">
        <div className="w-8 h-8" style={{ backgroundColor: value }}></div>
        <div>{key}</div>
        <div>{fromHSLtoJustValues(value)}</div>
      </div>
    );
  });
};

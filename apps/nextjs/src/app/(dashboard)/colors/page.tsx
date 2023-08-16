/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@haxiom/ui';
import { MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS } from '~/app/(dashboard)/_constants';
import { grayDark, grayDarkA } from '@radix-ui/colors';
import { ArrowRight } from '@haxiom/ui/icons';
import { Separator } from '@haxiom/ui/separator';

const getScaleName = (scale: Record<string, string>) => {
  const scaleName = Object.keys(scale)[0]?.replace(/(\d+)/g, '');
  return scaleName;
};

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
      const units = ['deg', '%', '%', ''];
      const separators = ['', '', '/'];
      return value
        .replace('hsla(', '')
        .replace(')', '')
        .replace(/%/g, '')
        .split(',')
        .map((value, i) => value.trim() + units[i] + (separators[i] ? ` ${separators[i]}` : ''))
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

function cloneObjButRunAFunctionOnEachValue<T extends Record<string, any>, U>(
  obj: T,
  func: (value: any) => U
): Record<string, U> {
  return Object.keys(obj).reduce((clonedObj, key) => {
    clonedObj[key] = func(obj[key]);
    return clonedObj;
  }, {} as Record<string, U>);
}

function cloneObjButRunAFunctionOnEachKey<T extends Record<string, any>>(
  obj: T,
  func: (key: string) => string
): Record<string, string> {
  return Object.keys(obj).reduce((clonedObj, key) => {
    const newKey = func(key);
    clonedObj[newKey] = obj[key] as string;
    return clonedObj;
  }, {} as Record<string, string>);
}

const semanticSteps = {
  background: [
    { key: 'background-base', step: 1 },
    { key: 'background-subtle', step: 2 },
    { key: 'background-element', step: 3 },
    { key: 'background-element-hover', step: 4 },
    { key: 'background-element-active', step: 5 },
    { key: 'background-element-selected', step: 5 },
    { key: 'separator-subtle', step: 6 },
  ],
  border: [
    { key: 'separator-subtle', step: 6 },
    { key: 'border-subtle', step: 6 },
    { key: 'element-border', step: 7 },
    { key: 'element-border-hover', step: 8 },
  ],
  solid: [
    { key: 'solid', step: 9 },
    { key: 'solid-hover', step: 10 },
  ],
  foreground: [
    { key: 'foreground-subtle', step: 11 },
    { key: 'foreground', step: 12 },
  ],
};

const flatSemanticSteps = Object.values(semanticSteps).flatMap((entry) => entry);

function generateCSSPropertiesOfSemanticTokensForScale(scaleName: string, prefix?: string) {
  const makeString = (value: number) => `var(--${prefix ? `${prefix}-` : ''}${scaleName}-${value})`;
  const makeKey = (value: string) => `--${prefix ? `${prefix}-` : ''}${scaleName}-${value}`;

  return flatSemanticSteps.reduce((acc, item) => {
    acc[makeKey(item.key)] = makeString(item.step);
    return acc;
  }, {} as Record<string, string>);
}

function generateUsageSpreadableInTWThemeOfSemanticTokens(scaleName: string, prefix?: string) {
  /**
   * Radix scales that end with an A are alpha scales, they have transparency defined so we shouldn't add <alpha-value> to them
   */
  const isAlpha = scaleName.at(-1) === 'A';

  /**
   * removes parent and adds scale name, so `background-base` becomes `scaleName-base`
   * it only removes the parent if it's followed by a dash, so `solid` stays `solid` despite having a parent of the same name
   */
  const makeKey = (value: string, parent: string) => `${scaleName}-${value.replace(`${parent}-`, '')}`;

  const makeString = (value: string) => `var(--${prefix ? `${prefix}-` : ''}${scaleName}-${value})`;
  const putInsideHSLFunction = (value: string, isAlpha: boolean) => `hsl(${value}${isAlpha ? '' : ' / <alpha-value>'})`;

  return Object.entries(semanticSteps).reduce((acc, [key, value]) => {
    acc[key as keyof typeof semanticSteps] = value.reduce((acc, item) => {
      acc[makeKey(item.key, key)] = putInsideHSLFunction(makeString(item.key), isAlpha);
      return acc;
    }, {} as Record<string, string>);
    return acc;
  }, {} as Record<keyof typeof semanticSteps, Record<string, string>>);
}

const fromJustValuesToCSSCustomPropertiesTuple = (
  name: string,
  color: ReturnType<typeof fromHSLtoJustValues>,
  prefix?: string
): [string, string] => {
  return [`--${prefix ? `${prefix}-` : ''}${name}`, `${color};`];
};

const fromJustValuesToTailwindColorsThatConsumeCSSProperties = (
  scaleWithJustValues: Record<string, string>,
  prefix?: string
) =>
  Object.entries(scaleWithJustValues).reduce((acc, [key, value]) => {
    let colorFunction = 'hsl';
    if (value.includes('/')) {
      colorFunction = 'hsla';
    }

    acc[key] = `hsl(var(--${prefix ? `${prefix}-` : ''}${key})${colorFunction === 'hsl' ? ' / <alpha-value>)' : ')'}`;
    return acc;
  }, {} as Record<string, string>);

const addDashesToRadixScaleSteps = <T extends Record<string, string>>(scale: T) =>
  cloneObjButRunAFunctionOnEachKey(scale, (key) => key.replace(/(\d+)/g, '-$1'));

export default function Page() {
  return (
    <main className={cn(MAX_WIDTH_CLASS, MAIN_CONTENT_CLASS, 'bg-gray-solid flex flex-col gap-4 h-full')}>
      <div className="shrink-0 flex flex-col gap-2">
        <div>
          <Scale raw scale={grayDark} />
        </div>
        <div>
          <Scale raw scale={grayDarkA} />
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
            <div>{fromHSLtoJustValues(grayDarkA.grayA1).includes('/') ? 'hsla' : 'hsl'}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

const Scale = ({ scale, raw = false }: { scale: Record<string, string>; raw?: boolean }) => {
  const scaleWithDashes = addDashesToRadixScaleSteps(scale);
  const convertedScale = Object.entries(scaleWithDashes).map(([key, value]) => {
    return {
      key,
      color: fromHSLtoJustValues(value),
    };
  });

  if (raw) {
    const scaleWithJustValues = cloneObjButRunAFunctionOnEachValue(scaleWithDashes, fromHSLtoJustValues);
    const prefix = 'tw';

    // Inject this in theme
    // spread in root colors
    const scaleToTailwindColorsThatConsumeCSSProperties = fromJustValuesToTailwindColorsThatConsumeCSSProperties(
      scaleWithJustValues,
      prefix
    );
    // spread each color in it's desired place
    const spreadableTokensForTheme = generateUsageSpreadableInTWThemeOfSemanticTokens(getScaleName(scale), prefix);
    // end inject in theme

    // Inject this in root
    const cssObject = Object.fromEntries(
      Object.entries(scaleWithJustValues).reduce((css, [key, value]) => {
        css.push(fromJustValuesToCSSCustomPropertiesTuple(key, value, prefix));
        return css;
      }, [] as string[][])
    );
    const semanticScale = generateCSSPropertiesOfSemanticTokensForScale(getScaleName(scale), prefix);
    // end inject in root

    const res = semanticScale;
    return (
      <pre>
        <code>{JSON.stringify(res, null, 2)}</code>
      </pre>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {convertedScale.map((color) => {
        return (
          <div key={color.key} className="flex gap-2 items-center">
            <div className="w-8 h-8" style={{ backgroundColor: scaleWithDashes[color.key] }}></div>
            <div>{color.key}</div>
            <div>{color.color}</div>
          </div>
        );
      })}
    </div>
  );
};

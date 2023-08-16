import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin"
import { fontFamily } from "tailwindcss/defaultTheme";
import { default as tailwindRadix} from "tailwindcss-radix"
// @ts-ignore - tailwindcss-animate is not typed. see: https://github.com/jamiebuilds/tailwindcss-animate
import { default as tailwindAnimate} from "tailwindcss-animate"

import { gray, grayDark, grayA } from "@radix-ui/colors"

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


const grayWithDashes = addDashesToRadixScaleSteps(gray);
const grayDarkWithDashes = addDashesToRadixScaleSteps(grayDark);
const prefix = 'tw';

const spreadableTokensForTheme = generateUsageSpreadableInTWThemeOfSemanticTokens('gray', prefix);

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...fromJustValuesToTailwindColorsThatConsumeCSSProperties(
        grayWithDashes,
        prefix
      ),
    },
    transitionTimingFunction: {
      /**
       * See: https://carbondesignsystem.com/guidelines/motion/overview/
       */
      DEFAULT: "cubic-bezier(0.2, 0, 0.38, 0.9)",
      "productive-standard": "cubic-bezier(0.2, 0, 0.38, 0.9)",
      "productive-entrance": "cubic-bezier(0, 0, 0.38, 0.9)",
      "productive-exit": "cubic-bezier(0.2, 0, 1, 0.9)",
      "expressive-standard": "cubic-bezier(0.4, 0.14, 0.3, 1)",
      "expressive-entrance": "cubic-bezier(0, 0, 0.3, 1)",
      "expressive-exit": "cubic-bezier(0.4, 0.14, 1, 1)",
    },
    transitionDuration: {
      /**
       * fast-01 - 70ms - Micro-interactions such as button and toggle
       *
       * fast-02 - 110ms - Micro-interactions such as fade
       *
       * moderate-01 - 150ms - Micro-interactions, small expansion, short distance movements
       *
       * moderate-02 - 240ms - Expansion, system communication, toast
       *
       * slow-01 - 400ms - Large expansion, important system notifications
       *
       * slow-02 - 700ms - Background dimming
       *
       * See: https://carbondesignsystem.com/guidelines/motion/overview/
       */
      DEFAULT: "70ms",
      "fast-01": "70ms",
      "fast-02": "110ms",
      "moderate-01": "150ms",
      "moderate-02": "240ms",
      "slow-01": "400ms",
      "slow-02": "700ms",
    },
    extend: {
      colors: {
        ...spreadableTokensForTheme.solid,
      },
      backgroundColor: {
        DEFAULT: spreadableTokensForTheme.background.base ?? "",
        ...spreadableTokensForTheme.background,  
      },
      textColor: {
        DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
        ...spreadableTokensForTheme.foreground,  
      },
      borderColor: {
        DEFAULT: "hsl(var(--element-border) / <alpha-value>)",
        ...spreadableTokensForTheme.border,  
      },
      ringColor: {
        DEFAULT: "hsl(var(--focus-ring) / <alpha-value>)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    tailwindRadix, 
    tailwindAnimate,
    plugin(function ({ addUtilities, addBase }) {
      const scaleName = getScaleName(gray) ?? "";
      const scaleWithJustValues = cloneObjButRunAFunctionOnEachValue(grayWithDashes, fromHSLtoJustValues);
      
      const cssObject = Object.fromEntries(
        Object.entries(scaleWithJustValues).reduce((css, [key, value]) => {
          css.push(fromJustValuesToCSSCustomPropertiesTuple(key, value, prefix));
          return css;
        }, [] as string[][])
      );
      const semanticScale = generateCSSPropertiesOfSemanticTokensForScale(scaleName, prefix);
      

      addBase({
        ":root": {
          ...cssObject,
          ...semanticScale
        },
      })
    })
  ],
} satisfies Config;

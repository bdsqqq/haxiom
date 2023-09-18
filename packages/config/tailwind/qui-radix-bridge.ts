import { defu } from "defu";
import plugin from "tailwindcss/plugin";
import { Config } from "tailwindcss/types";

/* ========================================
data wrangling
======================================== */

/**
 * @param color hsl() or hsla() string eg: "hsl(0, 0%, 0%)" or "hsla(0deg, 0%, 0%, 0.5)"
 * @returns space separated values with units. e.g. "0deg 0% 0%"
 */
const extractValuesFromHSL = (color: string) => {
  const functionTransforms = {
    hsl: (value: string) => {
      const units = ["deg", "%", "%"];
      return value
        .replace("hsl(", "")
        .replace(")", "")
        .replace(/%/g, "")
        .split(",")
        .map((value, i) => value.trim() + (units[i] ?? ""))
        .join(" ");
    },
    hsla: (value: string) => {
      const units = ["deg", "%", "%", ""];
      const separators = ["", "", "/"];
      return value
        .replace("hsla(", "")
        .replace(")", "")
        .replace(/%/g, "")
        .split(",")
        .map(
          (value, i) =>
            value.trim() +
            units[i] +
            (separators[i] ? ` ${separators[i]}` : ""),
        )
        .join(" ");
    },
  } as const;

  const possibleFunctions = Object.keys(
    functionTransforms,
  ) as (keyof typeof functionTransforms)[];

  const functionType = possibleFunctions.find((func) =>
    color.startsWith(func + "("),
  );
  if (!functionType) {
    throw new Error(`Unknown function type for color ${color}`);
  }

  return functionTransforms[functionType](color);
};

/**
 * Assumes scale is an object where keys are <scale-name>-<step> and that all keys will have the same format as the first one. Made for radix scales.
 */
const extractScaleNameFromKeys = (scale: Record<string, string>) => {
  const scaleName = Object.keys(scale)[0]
    ?.replace(/(\d+)/g, "")
    .replace(/-/g, "");
  return scaleName;
};

function transformValuesInObject<T extends Record<string, any>, U>(
  obj: T,
  func: (value: any) => U,
): Record<string, U> {
  return Object.keys(obj).reduce((clonedObj, key) => {
    clonedObj[key] = func(obj[key]);
    return clonedObj;
  }, {} as Record<string, U>);
}

function transformKeysInObject<T extends Record<string, any>>(
  obj: T,
  func: (key: string) => string,
): Record<string, string> {
  return Object.keys(obj).reduce((clonedObj, key) => {
    const newKey = func(key);
    clonedObj[newKey] = obj[key] as string;
    return clonedObj;
  }, {} as Record<string, string>);
}

/**
 * searches for all sequences of digits and replace them with a dash followed by the same sequence of digits.
 * eg: abc123def456 -> abc-123def-456
 */
const addDashesBeforeNumberSequences = (key: string) =>
  key.replace(/(\d+)/g, "-$1");

/* ========================================
Semantic step generation
======================================== */

const tailwindCorePluginsWithColorInTheName = [
  "accentColor",
  "backgroundColor",
  "borderColor",
  "boxShadowColor",
  "caretColor",
  "colors",
  "divideColor",
  "gradientColorStops",
  "outlineColor",
  "placeholderColor",
  "ringColor",
  "ringOffsetColor",
  "textColor",
  "textDecorationColor",
] as const;
type TailwindCorePluginsWithColorInTheName =
  (typeof tailwindCorePluginsWithColorInTheName)[number];

type SemanticSteps = {
  [K in TailwindCorePluginsWithColorInTheName]?: Array<{
    key: string;
    step: string;
  }>;
};

const radixSemanticSteps = {
  backgroundColor: [
    { key: "background-base", step: "1" },
    { key: "background-subtle", step: "2" },
    { key: "background-element", step: "3" },
    { key: "background-element-hover", step: "4" },
    { key: "background-element-active", step: "5" },
    { key: "background-element-selected", step: "5" },
    { key: "separator-subtle", step: "6" },
  ],
  ringOffsetColor: [
    { key: "background-base", step: "1" },
    { key: "background-subtle", step: "2" },
    { key: "background-element", step: "3" },
    { key: "background-element-hover", step: "4" },
    { key: "background-element-active", step: "5" },
    { key: "background-element-selected", step: "5" },
  ],
  borderColor: [
    { key: "border-DEFAULT", step: "6" },
    { key: "separator-subtle", step: "6" },
    { key: "border-subtle", step: "6" },
    { key: "border-element", step: "7" },
    { key: "border-element-hover", step: "8" },
  ],
  divideColor: [
    { key: "divide-DEFAULT", step: "6" },
    { key: "divide-subtle", step: "6" },
    { key: "divide-element", step: "7" },
    { key: "divide-element-hover", step: "8" },
  ],
  ringColor: [
    { key: "ring-DEFAULT", step: "7" },
    { key: "base", step: "7" },
  ],
  colors: [
    { key: "solid", step: "9" },
    { key: "solid-hover", step: "10" },
  ],
  boxShadowColor: [
    { key: "boxShadow-DEFAULT", step: "9" },
    { key: "boxShadow-subtle", step: "9" },
    { key: "boxShadow-contrast", step: "10" },
  ],
  accentColor: [
    { key: "accent-DEFAULT", step: "9" },
    { key: "accent-base", step: "9" },
    { key: "accent-hover", step: "10" },
  ],
  textColor: [
    { key: "text-subtle", step: "11" },
    { key: "text-contrast", step: "12" },
    { key: "text-on-solid-subtle", step: "2" },
    { key: "text-on-solid-contrast", step: "1" },
  ],
  textDecorationColor: [
    { key: "textDecoration-subtle", step: "11" },
    { key: "textDecoration-contrast", step: "12" },
    { key: "textDecoration-on-solid-subtle", step: "2" },
    { key: "textDecoration-on-solid-contrast", step: "1" },
  ],
  placeholderColor: [
    { key: "placeholder-subtle", step: "11" },
    { key: "placeholder-contrast", step: "12" },
    { key: "placeholder-on-solid-subtle", step: "2" },
    { key: "placeholder-on-solid-contrast", step: "1" },
  ],
} satisfies SemanticSteps;

const flattenSemanticSteps = (semanticSteps: SemanticSteps) =>
  Object.values(semanticSteps).flatMap((entry) => entry);

function generateCSSPropertiesForSemanticScale(
  scaleName: string,
  semanticSteps: SemanticSteps,
  prefix?: string,
) {
  const makeCSSVar = (value: string) =>
    `var(--${prefix ? `${prefix}-` : ""}${scaleName}-${value})`;

  const makeKey = (value: string) =>
    `--${prefix ? `${prefix}-` : ""}${scaleName}-${value}`;

  const flatSemanticSteps = flattenSemanticSteps(semanticSteps);

  return flatSemanticSteps.reduce((acc, item) => {
    acc[makeKey(item.key)] = makeCSSVar(item.step);
    return acc;
  }, {} as Record<string, string>);
}

function generateSemanticTokensForTWTheme(
  scaleName: string,
  semanticSteps: SemanticSteps,
  prefix?: string,
  options?: { omitName?: boolean },
) {
  /**
   * Radix scales that end with an A are alpha scales, they have transparency defined so we shouldn't add <alpha-value> to them
   */
  const isAlpha = scaleName[scaleName.length - 1] === "A";

  /**
   * removes parent and adds scale name, so `background-base` becomes `scaleName-base`
   * it only removes the parent if it's followed by a dash, so `solid` stays `solid` despite having a parent of the same name
   */
  const makeKey = (value: string, parent: string) => {
    const valueWithoutParent = value.replace(`${parent}-`, "");

    return `${options?.omitName ? "" : `${scaleName}-`}${valueWithoutParent}`;
  };

  const makeCSSVar = (value: string) =>
    `var(--${prefix ? `${prefix}-` : ""}${scaleName}-${value})`;

  /**
   * Wraps value passed in an hsl() function with <alpha-value> if it doesn't already has alpha for consumption in tailwind theme.
   */
  const putInsideHSLFunction = (value: string, isAlpha: boolean) =>
    `hsl(${value}${isAlpha ? "" : " / <alpha-value>"})`;

  return Object.entries(semanticSteps).reduce((acc, [key, value]) => {
    acc[key as keyof typeof semanticSteps] = value.reduce((acc, item) => {
      // if the key ends with "Color" we remove "Color", so `backgroundColor` becomes `background`
      const keyWithoutColorSuffix = key.endsWith("Color")
        ? key.replace("Color", "")
        : key;

      acc[makeKey(item.key, keyWithoutColorSuffix)] = putInsideHSLFunction(
        makeCSSVar(item.key),
        isAlpha,
      );
      return acc;
    }, {} as Record<string, string>);
    return acc;
  }, {} as Record<keyof SemanticSteps, Record<string, string>>);
}

/* ========================================
CSS custom property
======================================== */

const createCSSCustomPropertyTuple = (options: {
  key: string;
  value: string;
  prefix?: string;
}): [string, string] => {
  const { key, value, prefix } = options;

  const maybePrefix = prefix ? `${prefix}-` : "";

  return [`--${maybePrefix}${key}`, `${value};`];
};

// TODO: support rgb (eww)
/**
 * @param scale scale with keys that are <scale-name>-<step> and values that are space separated values with units. e.g. "0deg 0% 0%"
 * colors generated use CSS custom properties, to allow tailwind opacity utilities it's necessary to add <alpha-value> to the end of the value. This means that the color will consist of only values eg: `0deg 0% 0%` instead of `hsl(0, 0%, 0%)`.
 * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
 */
const convertScaleToTailwindColorObject = (
  scale: Record<string, string>,
  prefix?: string,
) =>
  Object.entries(scale).reduce((acc, [key, value]) => {
    let colorFunction = "hsl";
    if (value.includes("/")) {
      colorFunction = "hsla";
    }

    acc[key] = `hsl(var(--${prefix ? `${prefix}-` : ""}${key})${
      colorFunction === "hsl" ? " / <alpha-value>)" : ")"
    }`;
    return acc;
  }, {} as Record<string, string>);

const addDashesToRadixScaleKeys = <T extends Record<string, string>>(
  scale: T,
) => transformKeysInObject(scale, addDashesBeforeNumberSequences);

export const generateTailwindThemeData = (options: {
  lightScales: Array<Record<string, string>>;
  semanticSteps?: SemanticSteps;
  darkScales?: Array<Record<string, string>>;
  defaultScale?: string;
  prefix?: string;
}) => {
  const {
    lightScales,
    darkScales,
    prefix = "tw",
    defaultScale = "",
    semanticSteps = radixSemanticSteps,
  } = options ?? {};

  if (!lightScales.length) {
    throw new Error("No scales provided");
  }

  const allScaleNames = Array.from(
    new Set([
      ...lightScales.map(extractScaleNameFromKeys),
      ...(darkScales?.map(extractScaleNameFromKeys) ?? []),
    ]),
  );

  if (defaultScale) {
    const foundDefaultScale = allScaleNames.includes(defaultScale);

    if (!foundDefaultScale) {
      throw new Error(
        `Default scale ${defaultScale} not found, select from the scales: ${allScaleNames.join(
          ", ",
        )}`,
      );
    }
  }

  // RADIX SPECIFIC
  const lightScalesWithDashes = lightScales.map(addDashesToRadixScaleKeys);
  const darkScalesWithDashes = darkScales?.map(addDashesToRadixScaleKeys);
  const lightScalesWithJustValues = lightScalesWithDashes.map((scale) =>
    transformValuesInObject(scale, extractValuesFromHSL),
  );
  const darkScalesWithJustValues = darkScalesWithDashes?.map((scale) =>
    transformValuesInObject(scale, extractValuesFromHSL),
  );
  // END RADIX SPECIFIC

  const lightScalesWithTailwindColorsThatConsumeCSSProperties =
    lightScalesWithJustValues.reduce((acc, scale) => {
      return {
        ...acc,
        ...convertScaleToTailwindColorObject(scale, prefix),
      };
    }, {} as Record<string, string>);

  const scalesWithCSSCustomProperties = lightScalesWithJustValues.reduce(
    (acc, scale) => {
      const cssObject = Object.fromEntries(
        Object.entries(scale).reduce((css, [key, value]) => {
          css.push(createCSSCustomPropertyTuple({ key, value, prefix }));
          return css;
        }, [] as string[][]),
      );
      return { ...acc, ...cssObject };
    },
    {} as Record<string, string>,
  );

  const darkScalesWithCSSCustomProperties = darkScalesWithJustValues?.reduce(
    (acc, scale) => {
      const cssObject = Object.fromEntries(
        Object.entries(scale).reduce((css, [key, value]) => {
          css.push(createCSSCustomPropertyTuple({ key, value, prefix }));
          return css;
        }, [] as string[][]),
      );
      return { ...acc, ...cssObject };
    },
    {} as Record<string, string>,
  );

  const scalesWithSemanticTokens = lightScalesWithJustValues.reduce(
    (acc, scale) => {
      const scaleName = extractScaleNameFromKeys(scale);
      if (!scaleName) {
        throw new Error(
          `Scale name not found for scale ${JSON.stringify(scale)}`,
        );
      }

      const semanticScale = generateCSSPropertiesForSemanticScale(
        scaleName,
        semanticSteps,
        prefix,
      );
      return { ...acc, ...semanticScale };
    },
    {} as Record<string, string>,
  );

  const semanticScales = lightScalesWithJustValues.reduce((acc, scale) => {
    const scaleName = extractScaleNameFromKeys(scale);
    if (!scaleName) {
      throw new Error(
        `Scale name not found for scale ${JSON.stringify(scale)}`,
      );
    }

    const semanticScale = generateSemanticTokensForTWTheme(
      scaleName,
      semanticSteps,
      prefix,
    );

    return defu(semanticScale, acc);
  }, {});

  const semanticDefaultScale = generateSemanticTokensForTWTheme(
    defaultScale,
    semanticSteps,
    prefix,
    {
      omitName: true,
    },
  );

  const allSemanticScales = defu(semanticScales, semanticDefaultScale);

  const useInRoot = {
    scalesWithCSSCustomProperties,
    scalesWithSemanticTokens,
  };

  const useInRootDark = { darkScalesWithCSSCustomProperties };

  const stuffToPutInTheme = {
    rootScales: lightScalesWithTailwindColorsThatConsumeCSSProperties,
    semanticScales: allSemanticScales,
  };

  return {
    useInRoot,
    useInRootDark,
    stuffToPutInTheme,
  };
};

/* ========================================
User facing
======================================== */

export const qui = (
  options: {
    lightScales: Array<Record<string, string>>;
    darkScales?: Array<Record<string, string>>;
    defaultScale?: string;
    prefix?: string;
    semanticSteps?: SemanticSteps;
  },
  tailwindConfig: Config,
) => {
  const stuff = generateTailwindThemeData(options);

  return defu(tailwindConfig, {
    theme: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        ...stuff.stuffToPutInTheme.rootScales,
      },
      extend: {
        ...stuff.stuffToPutInTheme.semanticScales,
      },
    },
    plugins: [
      plugin(function ({ addUtilities, addBase }) {
        addBase({
          ":root": {
            ...stuff.useInRoot.scalesWithSemanticTokens,
          },
          ":root[data-theme='light'], .light": {
            ...stuff.useInRoot.scalesWithCSSCustomProperties,
          },
          ":root[data-theme='dark'], .dark": {
            ...stuff.useInRootDark.darkScalesWithCSSCustomProperties,
          },
        });
      }),
    ],
  });
};

/*
THIS IS ME THINKING, NOT A SPEC, THIS ISN"T SOURCE OF TRUTH, JUST ME THINKING.

I'm starting with three pieces of data: arrays of scales (light and dark), semantic steps, an optional scale name to use as a default, and an optional prefix to use for the CSS custom properties.

The scales in the arrays are objects where the keys are <scale-name>-<step> and the values are hsl() or hsla() strings. The scale name is used to generate the CSS custom properties and the semantic tokens. The step is used to generate the CSS custom properties and the semantic tokens.

The semantic steps are an object where the keys are the name of the tailwind core plugin that will be used to generate the semantic tokens and the values are arrays of objects where each object has a key and a step. The key is the name of the semantic token and the step is the step of the scale that will be used to generate the value of the semantic token.

The default scale name is used to generate the semantic tokens for the default scale. The default scale is the scale that will be used to generate the semantic tokens for the semantic tokens that don't have a scale name in their name. For example, if the default scale name is "solid" and the semantic steps are { colors: [{ key: "solid", step: "9" }] }, the semantic tokens will be { colors: { solid: "hsl(var(--solid-9) / <alpha-value>)" } }.

The prefix is used to prefix the CSS custom properties. For example, if the prefix is "tw", the CSS custom properties will be --tw-<scale-name>-<step>. The prefix is also used to prefix the semantic tokens. For example, if the prefix is "tw", the semantic tokens will be { colors: { "tw-solid": "hsl(var(--tw-solid-9) / <alpha-value>)" } }.

The function returns an object with three properties: stuffToPutInRoot, stuffToPutInRootDark, and stuffToPutInTheme.

stuffToPutInRoot is an object with the CSS custom properties and the semantic tokens. The CSS custom properties are the CSS custom properties for the light scales. The semantic tokens are the semantic tokens for the light scales.

stuffToPutInRootDark is an object with the CSS custom properties for the dark scales.

stuffToPutInTheme is an object with the semantic tokens for the light scales and the semantic tokens for the dark scales. The semantic tokens for the light scales are the semantic tokens for the light scales. The semantic tokens for the dark scales are the semantic tokens for the dark scales.


*/

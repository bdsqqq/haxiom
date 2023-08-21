const getScaleName = (scale: Record<string, string>) => {
  const scaleName = Object.keys(scale)[0]
    ?.replace(/(\d+)/g, "")
    .replace(/-/g, "");
  return scaleName;
};

const fromHSLtoJustValues = (color: string) => {
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

function cloneObjButRunAFunctionOnEachValue<T extends Record<string, any>, U>(
  obj: T,
  func: (value: any) => U,
): Record<string, U> {
  return Object.keys(obj).reduce((clonedObj, key) => {
    clonedObj[key] = func(obj[key]);
    return clonedObj;
  }, {} as Record<string, U>);
}

function cloneObjButRunAFunctionOnEachKey<T extends Record<string, any>>(
  obj: T,
  func: (key: string) => string,
): Record<string, string> {
  return Object.keys(obj).reduce((clonedObj, key) => {
    const newKey = func(key);
    clonedObj[newKey] = obj[key] as string;
    return clonedObj;
  }, {} as Record<string, string>);
}

// TODO: make those spreads based on this object.
const semanticSteps = {
  background: [
    { key: "background-base", step: 1 },
    { key: "background-subtle", step: 2 },
    { key: "background-element", step: 3 },
    { key: "background-element-hover", step: 4 },
    { key: "background-element-active", step: 5 },
    { key: "background-element-selected", step: 5 },
    { key: "separator-subtle", step: 6 },
  ],
  border: [
    { key: "separator-subtle", step: 6 },
    { key: "border-subtle", step: 6 },
    { key: "element-border", step: 7 },
    { key: "element-border-hover", step: 8 },
  ],
  solid: [
    { key: "solid", step: 9 },
    { key: "solid-hover", step: 10 },
  ],
  foreground: [
    { key: "foreground-subtle", step: 11 },
    { key: "foreground", step: 12 },
  ],
};

const flatSemanticSteps = Object.values(semanticSteps).flatMap(
  (entry) => entry,
);

function generateCSSPropertiesOfSemanticTokensForScale(
  scaleName: string,
  prefix?: string,
) {
  const makeString = (value: number) =>
    `var(--${prefix ? `${prefix}-` : ""}${scaleName}-${value})`;
  const makeKey = (value: string) =>
    `--${prefix ? `${prefix}-` : ""}${scaleName}-${value}`;

  return flatSemanticSteps.reduce((acc, item) => {
    acc[makeKey(item.key)] = makeString(item.step);
    return acc;
  }, {} as Record<string, string>);
}

function generateUsageSpreadableInTWThemeOfSemanticTokens(
  scaleName: string,
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
  const makeKey = (value: string, parent: string) =>
    `${options?.omitName ? "" : `${scaleName}-`}${value.replace(
      `${parent}-`,
      "",
    )}`;

  const makeString = (value: string) =>
    `var(--${prefix ? `${prefix}-` : ""}${scaleName}-${value})`;
  const putInsideHSLFunction = (value: string, isAlpha: boolean) =>
    `hsl(${value}${isAlpha ? "" : " / <alpha-value>"})`;

  return Object.entries(semanticSteps).reduce((acc, [key, value]) => {
    acc[key as keyof typeof semanticSteps] = value.reduce((acc, item) => {
      acc[makeKey(item.key, key)] = putInsideHSLFunction(
        makeString(item.key),
        isAlpha,
      );
      return acc;
    }, {} as Record<string, string>);
    return acc;
  }, {} as Record<keyof typeof semanticSteps, Record<string, string>>);
}

const fromJustValuesToCSSCustomPropertiesTuple = (
  name: string,
  color: ReturnType<typeof fromHSLtoJustValues>,
  prefix?: string,
): [string, string] => {
  return [`--${prefix ? `${prefix}-` : ""}${name}`, `${color};`];
};

const fromJustValuesToTailwindColorsThatConsumeCSSProperties = (
  scaleWithJustValues: Record<string, string>,
  prefix?: string,
) =>
  Object.entries(scaleWithJustValues).reduce((acc, [key, value]) => {
    let colorFunction = "hsl";
    if (value.includes("/")) {
      colorFunction = "hsla";
    }

    acc[key] = `hsl(var(--${prefix ? `${prefix}-` : ""}${key})${
      colorFunction === "hsl" ? " / <alpha-value>)" : ")"
    }`;
    return acc;
  }, {} as Record<string, string>);

const addDashesToRadixScaleSteps = <T extends Record<string, string>>(
  scale: T,
) =>
  cloneObjButRunAFunctionOnEachKey(scale, (key) =>
    key.replace(/(\d+)/g, "-$1"),
  );

export const giveMeTheThingsForTheseScales = (options: {
  lightScales: Array<Record<string, string>>;
  darkScales?: Array<Record<string, string>>;
  defaultScale?: string;
  prefix?: string;
}) => {
  const {
    lightScales,
    darkScales,
    prefix = "tw",
    defaultScale = "",
  } = options ?? {};

  if (!lightScales.length) {
    throw new Error("No scales provided");
  }

  const allScaleNames = Array.from(
    new Set([
      ...lightScales.map(getScaleName),
      ...(darkScales?.map(getScaleName) ?? []),
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

  const scalesWithDashes = lightScales.map(addDashesToRadixScaleSteps);
  const darkScalesWithDashes = darkScales?.map(addDashesToRadixScaleSteps);
  const scalesWithJustValues = scalesWithDashes.map((scale) =>
    cloneObjButRunAFunctionOnEachValue(scale, fromHSLtoJustValues),
  );
  const darkScalesWithJustValues = darkScalesWithDashes?.map((scale) =>
    cloneObjButRunAFunctionOnEachValue(scale, fromHSLtoJustValues),
  );

  const scalesWithTailwindColorsThatConsumeCSSProperties =
    scalesWithJustValues.reduce((acc, scale) => {
      return {
        ...acc,
        ...fromJustValuesToTailwindColorsThatConsumeCSSProperties(
          scale,
          prefix,
        ),
      };
    }, {} as Record<string, string>);

  const scalesWithCSSCustomProperties = scalesWithJustValues.reduce(
    (acc, scale) => {
      const cssObject = Object.fromEntries(
        Object.entries(scale).reduce((css, [key, value]) => {
          css.push(
            fromJustValuesToCSSCustomPropertiesTuple(key, value, prefix),
          );
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
          css.push(
            fromJustValuesToCSSCustomPropertiesTuple(key, value, prefix),
          );
          return css;
        }, [] as string[][]),
      );
      return { ...acc, ...cssObject };
    },
    {} as Record<string, string>,
  );

  const scalesWithSemanticTokens = scalesWithJustValues.reduce((acc, scale) => {
    const scaleName = getScaleName(scale);
    if (!scaleName) {
      throw new Error(
        `Scale name not found for scale ${JSON.stringify(scale)}`,
      );
    }

    const semanticScale = generateCSSPropertiesOfSemanticTokensForScale(
      scaleName,
      prefix,
    );
    return { ...acc, ...semanticScale };
  }, {} as Record<string, string>);

  const scalesWithSemanticTokensForUsageInTWTheme = scalesWithJustValues.reduce(
    (acc, scale) => {
      const scaleName = getScaleName(scale);
      if (!scaleName) {
        throw new Error(
          `Scale name not found for scale ${JSON.stringify(scale)}`,
        );
      }

      const semanticScale = generateUsageSpreadableInTWThemeOfSemanticTokens(
        scaleName,
        prefix,
      );

      const { background, border, solid, foreground } = semanticScale;
      const {
        background: prevBackground,
        border: prevBorder,
        solid: prevSolid,
        foreground: prevForeground,
      } = acc;

      return {
        background: { ...prevBackground, ...background },
        border: { ...prevBorder, ...border },
        solid: { ...prevSolid, ...solid },
        foreground: { ...prevForeground, ...foreground },
      };
    },
    {
      background: {},
      border: {},
      solid: {},
      foreground: {},
    } as Record<string, any>,
  );

  const defaultScaleWithSemanticTokens =
    generateUsageSpreadableInTWThemeOfSemanticTokens(defaultScale, prefix, {
      omitName: true,
    });

  const scalesPlusDefaultScaleWithSemanticTokensForUsageInTWTheme = {
    background: {
      ...scalesWithSemanticTokensForUsageInTWTheme.background,
      ...(defaultScaleWithSemanticTokens.background ?? {}),
    },
    border: {
      ...scalesWithSemanticTokensForUsageInTWTheme.border,
      ...(defaultScaleWithSemanticTokens.border ?? {}),
    },
    solid: {
      ...scalesWithSemanticTokensForUsageInTWTheme.solid,
      ...(defaultScaleWithSemanticTokens.solid ?? {}),
    },
    foreground: {
      ...scalesWithSemanticTokensForUsageInTWTheme.foreground,
      ...(defaultScaleWithSemanticTokens.foreground ?? {}),
    },
  };

  const stuffToPutInRoot = {
    ...scalesWithCSSCustomProperties,
    ...scalesWithSemanticTokens,
  };

  const stuffToPutInRootDark = { ...darkScalesWithCSSCustomProperties };

  const stuffToPutInTheme = {
    scalesWithTailwindColorsThatConsumeCSSProperties,
    scalesWithSemanticTokensForUsageInTWTheme:
      scalesPlusDefaultScaleWithSemanticTokensForUsageInTWTheme,
  };

  return {
    stuffToPutInRoot,
    stuffToPutInRootDark,
    stuffToPutInTheme,
  };
};

import {
  amber,
  amberA,
  amberDark,
  amberDarkA,
  blue,
  blueA,
  blueDark,
  blueDarkA,
  grass,
  grassA,
  grassDark,
  grassDarkA,
  gray,
  grayA,
  grayDark,
  grayDarkA,
  plum,
  plumA,
  plumDark,
  plumDarkA,
  red,
  redA,
  redDark,
  redDarkA,
} from "@radix-ui/colors";
import type { Config } from "tailwindcss";
// @ts-ignore - tailwindcss-animate is not typed. see: https://github.com/jamiebuilds/tailwindcss-animate
import { default as tailwindAnimate } from "tailwindcss-animate";
import { default as tailwindRadix } from "tailwindcss-radix";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import { giveMeTheThingsForTheseScales } from "./qui-radix-bridge";

const stuff = giveMeTheThingsForTheseScales(
  [
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
  ],
  [
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
  ],
  {
    prefix: "qui",
    defaultScale: "gray",
  },
);

const quiPlaceholderName = (config: Config) => {
  const tempColors = Object.assign({}, config.theme?.colors, {
    "test-color": "gainsboro",
  });

  return {
    ...config,
    theme: {
      ...config.theme,
      colors: tempColors,
    },
  };
};

export default quiPlaceholderName({
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...stuff.stuffToPutInTheme
        .scalesWithTailwindColorsThatConsumeCSSProperties,
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
        ...stuff.stuffToPutInTheme.scalesWithSemanticTokensForUsageInTWTheme
          .solid,
      },
      backgroundColor: {
        DEFAULT:
          stuff.stuffToPutInTheme.scalesWithSemanticTokensForUsageInTWTheme
            .background.base ?? "",
        ...stuff.stuffToPutInTheme.scalesWithSemanticTokensForUsageInTWTheme
          .background,
      },
      textColor: {
        DEFAULT:
          stuff.stuffToPutInTheme.scalesWithSemanticTokensForUsageInTWTheme
            .foreground.foreground ?? "",
        ...stuff.stuffToPutInTheme.scalesWithSemanticTokensForUsageInTWTheme
          .foreground,
      },
      borderColor: {
        DEFAULT:
          stuff.stuffToPutInTheme.scalesWithSemanticTokensForUsageInTWTheme
            .border.subtle ?? "",
        ...stuff.stuffToPutInTheme.scalesWithSemanticTokensForUsageInTWTheme
          .border,
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
      addBase({
        ":root": {
          ...stuff.stuffToPutInRoot,
        },
        ".dark": {
          ...stuff.stuffToPutInRootDark,
        },
      });
    }),
  ],
} satisfies Config);

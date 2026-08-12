import "./src/env.mjs";
import "@haxiom/api/src/env.mjs";

import withMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@haxiom/api"],
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
  },
  // modularizeImports: {
  //   "lucide-react": {
  //     transform: "lucide-react/dist/esm/icons/{{ kebabCase member }}",
  //   },
  // },

  /** We already do typechecking as a separate task in CI */
  typescript: { ignoreBuildErrors: true },
};

export default withMDX()(config);

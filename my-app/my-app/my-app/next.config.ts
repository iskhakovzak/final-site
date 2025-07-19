import type { NextConfig } from "next";
import { i18n } from './next-i18next.config.js';
import { experiments } from './experiments.js';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  i18n,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@sanity/client"],
  },
  // The `experiments` config is not a standard Next.js config option.
  // This is a custom config that we will use with the `next-experiments` library.
  // @ts-ignore
  experiments,
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "your-org-slug",
  project: "your-project-name",
}, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          { protocol: "http", hostname: "dummyimage.com" },
          { protocol: "https", hostname: "picsum.photos" },
          { protocol: "https", hostname: "loremflickr.com" },
        ],
      },
};

export default config;

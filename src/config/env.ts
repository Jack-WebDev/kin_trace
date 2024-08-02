export const config = {
  env: {
    secrets: {
      accessSecret: process.env.ACCESS_TOKEN_SECRET!,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
      authSecret: process.env.AUTH_TOKEN_SECRET!,
    },
  },
  duration: {
    accessTokenExp: 60 * 60 * 60 * 24 * 7 * 1000,
    refreshTokenExp: 60 * 60 * 60 * 24 * 7 * 1000,
    authTokenExp: 60 * 60 * 60 * 24 * 7 * 1000,
  },
};

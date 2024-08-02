import jwt from "jsonwebtoken";

export const signJwt = (payload: object, secret: string, exp: number) => {
  return jwt.sign({ payload }, secret, { expiresIn: exp });
};

export const verifyToken = <T>(token: string, secret: string): T | null => {
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    console.log(error);
    return null;
  }
};

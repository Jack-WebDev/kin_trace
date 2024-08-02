import crypto from "crypto";

export  function randomGenerator(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

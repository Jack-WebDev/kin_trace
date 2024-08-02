import { clientApi } from "./react";

export type ClientApiModels = {
  user: typeof clientApi.user;
  
  // Add more models as needed
};

export type ModelName = keyof ClientApiModels;

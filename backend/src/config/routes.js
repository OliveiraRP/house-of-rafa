import dotenv from "dotenv";
dotenv.config();

export const ROUTES = {
  HUB: process.env.HUB,
  BUDGET_MANAGER: process.env.BUDGET_MANAGER,
};

export const API = {
  ME: process.env.API_ME,
  CHECK_TOKEN: process.env.API_CHECK_TOKEN,
};

import { date } from "./date";
import CryptoJS from "crypto-js";

export const XAuth = CryptoJS.MD5(
  `${import.meta.env.VITE_API_PASSWORD}_${date}`
).toString();

import { fileURLToPath } from "url";
import path from "path";

export const getDirName = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = path.dirname(__filename);
  return __dirname;
};

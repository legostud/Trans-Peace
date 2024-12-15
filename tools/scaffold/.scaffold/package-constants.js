/**
 * Default prompt constraints
 */
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const extensions = ["ts", "tsx", "js", "jsx"];
export const projects = ["react","twig"];
export const httpVerbs = ["GET", "POST", "PUT", "DELETE"];
export const seperateFolderList = ["true", "false"];
export const modulePath = path.resolve(__dirname);

import { execSync } from "node:child_process";
import path from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const cwd = process.cwd();

const svgPath = path.join(cwd, "public", "emblems", "gunungan.svg");
const pngPath = path.join(cwd, "public", "emblems", "gunungan.png");

console.log("Rendering gunungan...");
execSync(
  `"${chrome}" --headless --disable-gpu --default-background-color=00000000 --window-size=1000,1600 --screenshot="${pngPath}" "file:///${svgPath.replace(/\\/g, "/")}"`,
  { stdio: "inherit" }
);

console.log("Gunungan rendered successfully!");

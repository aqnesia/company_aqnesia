import { execSync } from "node:child_process";
import path from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const cwd = process.cwd();

const items = ["japan", "taiwan", "indonesia"];

for (const name of items) {
  const svgPath = path.join(cwd, "public", "emblems", `${name}.svg`);
  const pngPath = path.join(cwd, "public", "emblems", `${name}.png`);
  console.log(`Rendering ${name}...`);
  execSync(
    `"${chrome}" --headless --disable-gpu --window-size=800,500 --screenshot="${pngPath}" "file:///${svgPath.replace(/\\/g, "/")}"`,
    { stdio: "inherit" }
  );
}

console.log("All emblems rendered successfully!");

// Build estático para o GitHub Pages (https://bragahauser-byte.github.io/remanesce).
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

rmSync(".next", { recursive: true, force: true });
execSync("next build", { stdio: "inherit", env: { ...process.env, DEPLOY_TARGET: "pages" } });
// Sem isso o Jekyll do Pages ignora a pasta _next.
writeFileSync("out/.nojekyll", "");

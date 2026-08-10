import { cp, mkdir, rm } from "node:fs/promises";

const workerOutput = "dist/operation_safequest/index.js";
const siteWorkerOutput = "dist/server/index.js";

await rm("dist/server", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await cp(workerOutput, siteWorkerOutput);

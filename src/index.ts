#!/usr/bin/env node

import { exec, execSync } from "child_process";

console.log("yeet");

console.log(process.cwd());

const cwd = process.cwd();

const rootDir = cwd.split("/")[cwd.split("/").length - 1];

console.log({ rootDir });

const devScriptMap = {
  v2: "dev",
  "rollup-service": "up:dev",
  "user-service": "up:user-stack:dev",
};

exec(`yarn ${devScriptMap[rootDir as keyof typeof devScriptMap]}`, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
})
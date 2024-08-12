#!/usr/bin/env node

import { exec, execSync } from "child_process";
import { argv } from "process";

try {
  if (argv.length >= 4) {
    throw new Error(
      `Too many args:\n${argv
        .slice(-2)
        .map((el, idx) => `[${idx}]: ${el}`)
        .join("\n")}`
    );
  }

  const message = argv[2];

  if (!message) {
    throw new Error("Please provide a commit message");
  }

  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();

    const [action, ticketNumber] = branch.split("/");

    const string = `${action}(${ticketNumber}): ${message}`;

    exec(`git commit -m "${string}"`, (error, stdout, stderr) => {
      console.log(stdout);
    });
  } catch (error) {
    // @ts-ignore
    console.log(error.stdout.toString());
  }
} catch (error) {
  console.log(error);
}

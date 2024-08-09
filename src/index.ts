#!/usr/bin/env node

import { exec, execSync } from "child_process";
import { argv } from "process";

try {
  const message = argv[2];
  if (!message) {
    throw new Error("Please provide a commit message");
  }

  // Main shiz
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    
    const [action, ticketNumber] = branch.split("/");

    const string = `${action}(${ticketNumber}): ${message}`;

    exec(`git commit -m "${string}"`, (error, stdout, stderr) => {
      console.log(stdout)
    });
  } catch (error) {
    // @ts-ignore
    console.log(error.stdout.toString());
  }
} catch (error) {
  console.log(error);
}

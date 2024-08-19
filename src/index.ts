#!/usr/bin/env node

import { exec, execSync } from "child_process";
import { argv } from "process";

try {
  const { flags, message } = argv.reduce<{
    flags: string[];
    message: null | string;
  }>(
    (prev, currValue, index) => {
      const getMessage = () => {
        if (prev.message) return prev.message;

        if (index === 2) {
          return currValue;
        }

        return prev.message;
      };

      const message = getMessage();

      return {
        ...prev,
        message,
        flags: currValue.startsWith("-")
          ? [...prev.flags, currValue]
          : prev.flags,
      };
    },
    { flags: [], message: null }
  );

  if (!message) {
    throw new Error("Please provide a commit message");
  }

  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();

    const [action, ticketNumber] = branch.split("/");

    const string = `${action}(${ticketNumber}): ${message}`;

    exec(`git commit -m "${string}" ${flags.join(" ")}`, (error, stdout, stderr) => {
      if (error) console.log(error);
      if (stderr) console.log(stderr);

      console.log(stdout);
    });
  } catch (error) {
    // @ts-ignore
    console.log(error.stdout.toString());
  }
} catch (error) {
  console.log(error);
}

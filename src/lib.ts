import * as core from "@actions/core";
import { z } from "zod";

type ActionsCore = typeof core;

const secretsSchema = z.record(z.string(), z.string());

export function exportSecrets(core: ActionsCore) {
  const secretsJson = core.getInput("secrets");
  const downcaseTfVar = core.getInput("downcase-tf-var") === "true";

  if (!secretsJson) {
    throw new Error("secrets is required");
  }

  const secrets = secretsSchema.parse(JSON.parse(secretsJson));

  for (const [key, value] of Object.entries(secrets)) {
    if (downcaseTfVar && key.startsWith("TF_VAR_")) {
      core.exportVariable(
        `TF_VAR_${key.replace(/^TF_VAR_/, "").toLowerCase()}`,
        value,
      );
    } else {
      core.exportVariable(key, value);
    }
  }
}

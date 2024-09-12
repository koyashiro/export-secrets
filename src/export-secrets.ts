import * as core from "@actions/core";
import * as v from "valibot";

const SecretsSchema = v.record(v.string(), v.string());

export function exportSecrets() {
  try {
    const secretsJson = core.getInput("secrets");
    const downcaseTfVar = core.getBooleanInput("downcase-tf-var");
    const downcaseTfToken = core.getBooleanInput("downcase-tf-token");

    if (!secretsJson) {
      core.setFailed("`secrets` is required");
      return;
    }

    let secretsObject: unknown;
    try {
      secretsObject = JSON.parse(secretsJson);
    } catch (error) {
      if (error instanceof Error) {
        core.error(error);
      }
      core.setFailed("`secrets` must be valid JSON");
      return;
    }

    const result = v.safeParse(SecretsSchema, secretsObject);
    if (!result.success) {
      core.setFailed("`secrets` must be JSON object of environment variables");
      return;
    }

    const secrets = result.output;

    for (const [key, value] of Object.entries(secrets)) {
      if (downcaseTfVar && key.startsWith("TF_VAR_")) {
        core.exportVariable(
          `TF_VAR_${key.replace(/^TF_VAR_/, "").toLowerCase()}`,
          value,
        );
        continue;
      }

      if (downcaseTfToken && key.startsWith("TF_TOKEN_")) {
        core.exportVariable(
          `TF_TOKEN_${key.replace(/^TF_TOKEN_/, "").toLowerCase()}`,
          value,
        );
        continue;
      }

      core.exportVariable(key, value);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.error(error);
    }
    core.setFailed("Failed to export secrets");
  }
}

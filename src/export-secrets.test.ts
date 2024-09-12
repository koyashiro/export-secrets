import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { exportSecrets } from "./export-secrets";

describe("exportSecrets()", () => {
  const core = vi.hoisted(() => ({
    getInput: vi.fn(),
    getBooleanInput: vi.fn(),
    exportVariable: vi.fn(),
    setFailed: vi.fn(),
    error: vi.fn(),
  }));

  beforeAll(() => {
    vi.mock("@actions/core", () => core);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe.each<{
    name: string;
    input: Record<string, string | undefined>;
    success: boolean;
    assersion: () => void;
  }>([
    {
      name: "success",
      input: {
        secrets: `{
          "FOO": "foo",
          "BAR": "bar",
          "BAZ": "baz",
          "TF_VAR_FOO": "tf-var-foo",
          "TF_VAR_BAR": "tf-var-bar",
          "TF_VAR_BAZ": "tf-var-baz",
          "TF_TOKEN_EXAMPLE_COM": "tf-token-example-com",
          "TF_TOKEN_EXAMPLE_NET": "tf-token-example-net",
          "TF_TOKEN_EXAMPLE_ORG": "tf-token-example-org"
        }`,
      },
      success: true,
      assersion: () => {
        expect(core.exportVariable).toHaveBeenCalledWith("FOO", "foo");
        expect(core.exportVariable).toHaveBeenCalledWith("BAR", "bar");
        expect(core.exportVariable).toHaveBeenCalledWith("BAZ", "baz");
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_FOO",
          "tf-var-foo",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_BAR",
          "tf-var-bar",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_BAZ",
          "tf-var-baz",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_EXAMPLE_COM",
          "tf-token-example-com",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_EXAMPLE_NET",
          "tf-token-example-net",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_EXAMPLE_ORG",
          "tf-token-example-org",
        );
      },
    },
    {
      name: "success_downcase_tf_var",
      input: {
        secrets: `{
          "FOO": "foo",
          "BAR": "bar",
          "BAZ": "baz",
          "TF_VAR_FOO": "tf-var-foo",
          "TF_VAR_BAR": "tf-var-bar",
          "TF_VAR_BAZ": "tf-var-baz",
          "TF_TOKEN_EXAMPLE_COM": "tf-token-example-com",
          "TF_TOKEN_EXAMPLE_NET": "tf-token-example-net",
          "TF_TOKEN_EXAMPLE_ORG": "tf-token-example-org"
        }`,
        "downcase-tf-var": "true",
      },
      success: true,
      assersion: () => {
        expect(core.exportVariable).toHaveBeenCalledWith("FOO", "foo");
        expect(core.exportVariable).toHaveBeenCalledWith("BAR", "bar");
        expect(core.exportVariable).toHaveBeenCalledWith("BAZ", "baz");
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_foo",
          "tf-var-foo",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_bar",
          "tf-var-bar",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_baz",
          "tf-var-baz",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_EXAMPLE_COM",
          "tf-token-example-com",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_EXAMPLE_NET",
          "tf-token-example-net",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_EXAMPLE_ORG",
          "tf-token-example-org",
        );
      },
    },
    {
      name: "success_downcase_tf_token",
      input: {
        secrets: `{
          "FOO": "foo",
          "BAR": "bar",
          "BAZ": "baz",
          "TF_VAR_FOO": "tf-var-foo",
          "TF_VAR_BAR": "tf-var-bar",
          "TF_VAR_BAZ": "tf-var-baz",
          "TF_TOKEN_EXAMPLE_COM": "tf-token-example-com",
          "TF_TOKEN_EXAMPLE_NET": "tf-token-example-net",
          "TF_TOKEN_EXAMPLE_ORG": "tf-token-example-org"
        }`,
        "downcase-tf-token": "true",
      },
      success: true,
      assersion: () => {
        expect(core.exportVariable).toHaveBeenCalledWith("FOO", "foo");
        expect(core.exportVariable).toHaveBeenCalledWith("BAR", "bar");
        expect(core.exportVariable).toHaveBeenCalledWith("BAZ", "baz");
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_FOO",
          "tf-var-foo",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_BAR",
          "tf-var-bar",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_BAZ",
          "tf-var-baz",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_example_com",
          "tf-token-example-com",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_example_net",
          "tf-token-example-net",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_example_org",
          "tf-token-example-org",
        );
      },
    },
    {
      name: "success_downcase_tf_var_and_tf_token",
      input: {
        secrets: `{
          "FOO": "foo",
          "BAR": "bar",
          "BAZ": "baz",
          "TF_VAR_FOO": "tf-var-foo",
          "TF_VAR_BAR": "tf-var-bar",
          "TF_VAR_BAZ": "tf-var-baz",
          "TF_TOKEN_EXAMPLE_COM": "tf-token-example-com",
          "TF_TOKEN_EXAMPLE_NET": "tf-token-example-net",
          "TF_TOKEN_EXAMPLE_ORG": "tf-token-example-org"
        }`,
        "downcase-tf-var": "true",
        "downcase-tf-token": "true",
      },
      success: true,
      assersion: () => {
        expect(core.exportVariable).toHaveBeenCalledWith("FOO", "foo");
        expect(core.exportVariable).toHaveBeenCalledWith("BAR", "bar");
        expect(core.exportVariable).toHaveBeenCalledWith("BAZ", "baz");
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_foo",
          "tf-var-foo",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_bar",
          "tf-var-bar",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_VAR_baz",
          "tf-var-baz",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_example_com",
          "tf-token-example-com",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_example_net",
          "tf-token-example-net",
        );
        expect(core.exportVariable).toHaveBeenCalledWith(
          "TF_TOKEN_example_org",
          "tf-token-example-org",
        );
      },
    },
    {
      name: "fail_empty",
      input: {
        secrets: "",
      },
      success: false,
      assersion: () => {
        expect(core.exportVariable).not.toHaveBeenCalled();
      },
    },
    {
      name: "fail_invalid_json",
      input: {
        secrets: '{ "FOO": "foo", "BAR": "bar", "BAZ": "baz"',
      },
      success: false,
      assersion: () => {
        expect(core.exportVariable).not.toHaveBeenCalled();
        expect(core.error).toHaveBeenCalled();
      },
    },
    {
      name: "fail_invalid_json_schema",
      input: {
        secrets: `{
          "parent": {
            "child": 100
          }
        }`,
      },
      success: false,
      assersion: () => {
        expect(core.exportVariable).not.toHaveBeenCalled();
        expect(core.error).not.toHaveBeenCalled();
      },
    },
  ])("$name", ({ input, success, assersion }) => {
    beforeEach(() => {
      core.getInput.mockImplementation((s: string) => input[s] ?? "");
      core.getBooleanInput.mockImplementation(
        (s: string) =>
          input[s] === "true" || input[s] === "True" || input[s] === "TRUE",
      );
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    it(success ? "success" : "fail", () => {
      exportSecrets();

      expect(core.getInput).toHaveBeenCalledWith("secrets");
      expect(core.getBooleanInput).toHaveBeenCalledWith("downcase-tf-var");
      expect(core.getBooleanInput).toHaveBeenCalledWith("downcase-tf-token");

      if (success) {
        expect(core.setFailed).not.toHaveBeenCalled();
      } else {
        expect(core.setFailed).toHaveBeenCalledOnce();
      }

      assersion();
    });
  });
});

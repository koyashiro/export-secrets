# export-secrets

Export GitHub Actions secrets as environment variables.

## Usage

Set the JSON of secrets to `secrets`.

```yaml
steps:
  - uses: koyashiro/export-secrets@v0.6.0
    with:
      secrets: ${{ toJSON(secrets) }}
```

### Downcase `TF_VAR_`

If you want to downcase secrets starting with `TF_VAR_`, you can use the `downcase-tf-var` option.
For example, a secret like `TF_VAR_EXAMPLE` will be exported as `TF_VAR_example`.

```yaml
steps:
  - uses: koyashiro/export-secrets@v0.6.0
    with:
      secrets: ${{ toJSON(secrets) }}
      downcase-tf-var: true
```

### Downcase `TF_TOKEN_`

If you want to downcase secrets starting with `TF_TOKEN_`, you can use the `downcase-tf-token` option.
For example, a secret like `TF_TOKEN_EXAMPLE_COM` will be exported as `TF_TOKEN_example_com`.

```yaml
steps:
  - uses: koyashiro/export-secrets@v0.6.0
    with:
      secrets: ${{ toJSON(secrets) }}
      downcase-tf-token: true
```

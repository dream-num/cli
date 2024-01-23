# @univerjs/create-cli

[![npm version](https://img.shields.io/npm/v/@univerjs/create-cli)](https://npmjs.org/package/@univerjs/create-cli)

> Command-line tool for quickly playing with [Univer](https://github.com/dream-num/univer).

## Features

- **Plugin Quickstart:** Swiftly create a new Univer plugin with ease.
- **Custom UMD Package:** Tailor your own UMD package with customizable options

See [Univer docs](https://univer.work/en-us/guides/extend/write-a-plugin/) for more information.

## Usage

Run the following command and follow the prompts to create a plugin:

```sh
# npm
npm create @univerjs/cli@latest

# pnpm
pnpm create @univerjs/cli@latest
```

### Options

#### **-l, --locale \<locale\>**

Special locale. Available options are `zh-CN` and `en-US`.

#### **-h, --help**

Display help for command.

## Development

```sh
pnpm i

pnpm dev
```

test, create `filter` plugin

```sh
node dist/index.js
```

---

<details>
  <summary>Internal use only</summary>

  <br />

  > This section is for internal use only. You don't need to read it.

  ## Usage

  ```sh
  pnpm create @univerjs/cli@latest --mode univer
  ```

  ## Release & Publish

  ```sh
  npm run release
  ```
</details>

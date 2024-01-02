# Create a Univer plugin from a template

See [Univer docs](https://univer.work/en-us/guides/extend/write-a-plugin/) for more information.

## Usage

```sh
# npm
npm create @univerjs/cli@latest init <path>

# pnpm
pnpm create @univerjs/cli@latest init <path>
```

## Development

```sh
pnpm i

npm run dev
```

test, create `filter` plugin

```sh
npm run start init ./packages/sheets-plugin-filter
```

## Release

```sh
npm run release
```

import path from 'node:path'
import fs from 'fs-extra'
import consola from 'consola'
import { ICliOptions } from "../types";
import { input } from '@inquirer/prompts';

const pakcages = [{
  name: '@univerjs/core',
}, {
  name: '@univerjs/design',
  style: true,
}, {
  name: '@univerjs/engine-render',
}, {
  name: '@univerjs/engine-formula',
}, {
  name: '@univerjs/ui',
  style: true,
}, {
  name: '@univerjs/sheets',
}, {
  name: '@univerjs/docs',
}, {
  name: '@univerjs/sheets-ui',
  style: true,
}, {
  name: '@univerjs/sheets-formula',
  style: true,
}, {
  name: '@univerjs/sheets-numfmt',
  style: true,
}]

export async function bundle (options: ICliOptions) {
  const outputPath = await input({
    message: '📝 Please enter the output path',
    default: process.cwd()
  })

  let outputJs = ''
  let outputCss = ''

  pakcages.forEach((item) => {
    const { name, style } = item

    const modulePath = require.resolve(name);

    if (style) {
      const cssPath = path.resolve(modulePath, '../../index.css')
      outputCss += fs.readFileSync(cssPath, 'utf-8')
    }

    const jsPath = path.resolve(modulePath, '../../umd/index.js')
    outputJs += fs.readFileSync(jsPath, 'utf-8')
  })

  if (outputCss) {
    fs.writeFileSync(`${outputPath}/univer.umd.css`, outputCss)
    consola.success('🎉 CSS bundle generated successfully')
  }

  fs.writeFileSync(`${outputPath}/univer.umd.js`, outputJs)
  consola.success('🎉 JS bundle generated successfully')
}

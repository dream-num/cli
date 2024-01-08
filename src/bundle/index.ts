import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { input } from '@inquirer/prompts'
import consola from 'consola'
import { ICliOptions } from '../types'
import { t } from '../i18n'

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
    message: t('bundle.choices.path'),
    default: process.cwd()
  })

  let outputJs = ''
  let outputCss = ''

  for (const item of pakcages) {
    const { name, style } = item

    const modulePath = fileURLToPath(await import.meta.resolve(name))

    if (style) {
      const cssPath = path.resolve(modulePath, '../../index.css')
      fs.readFileSync(cssPath, 'utf-8')
      outputCss += fs.readFileSync(cssPath, 'utf-8')
    }

    const jsPath = path.resolve(modulePath, '../../umd/index.js')
    outputJs += fs.readFileSync(jsPath, 'utf-8')
  }

  if (outputCss) {
    fs.writeFileSync(`${outputPath}/univer.umd.css`, outputCss)
    consola.success(t('bundle.success.css'))
  }

  fs.writeFileSync(`${outputPath}/univer.umd.js`, outputJs)
  consola.success(t('bundle.success.js'))
}

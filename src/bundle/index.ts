import process from 'node:process'
import path from 'node:path'
import { createRequire } from 'node:module'
import fs from 'fs-extra'
import { confirm, input } from '@inquirer/prompts'
import consola from 'consola'
import type { ICliOptions } from '../types'
import { t } from '../i18n'

async function getPackagePath(name: string) {
  const require = createRequire(import.meta.url)

  return require.resolve(name)
}

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
}, {
  name: '@univerjs/sheets-zen-editor',
  style: true,
}, {
  name: '@univerjs/network',
}, {
  name: '@univerjs/rpc',
}, {
  name: '@univerjs/uniscript',
  style: true,
}]

const reactUMD = path.resolve(await getPackagePath('react'), '../umd/react.production.min.js')
const reactDOMUMD = path.resolve(await getPackagePath('react-dom'), '../umd/react-dom.production.min.js')
const rxjsUMD = path.resolve(await getPackagePath('rxjs'), '../../bundles/rxjs.umd.min.js')
const clsxUMD = path.resolve(await getPackagePath('clsx'), '../clsx.min.js')
const rediUMD = path.resolve(await getPackagePath('@wendellhu/redi'), '../../dist/redi.js')
const rediReactBindingsUMD = path.resolve(await getPackagePath('@wendellhu/redi'), '../../dist/react-bindings.js')

export async function bundle(_options: ICliOptions) {
  try {
    const answer = {
      outputPath: await input({
        message: t('bundle.choices.path'),
        default: process.cwd(),
      }),
      react: await confirm({
        message: t('bundle.choices.react'),
        default: false,
      }),
      rxjs: await confirm({
        message: t('bundle.choices.rxjs'),
        default: false,
      }),
    }

    const { outputPath, react, rxjs } = answer

    let outputJs = ''
    let outputCss = ''

    if (!react) {
      outputJs += fs.readFileSync(reactUMD, 'utf-8')
      outputJs += fs.readFileSync(reactDOMUMD, 'utf-8')
    }

    if (!rxjs) {
      outputJs += fs.readFileSync(rxjsUMD, 'utf-8')
    }

    outputJs += fs.readFileSync(clsxUMD, 'utf-8')
    outputJs += fs.readFileSync(rediUMD, 'utf-8')
    outputJs += fs.readFileSync(rediReactBindingsUMD, 'utf-8')

    for (const item of pakcages) {
      const { name, style } = item

      const modulePath = await getPackagePath(name)

      if (style) {
        const cssPath = path.resolve(modulePath, '../../index.css')
        fs.readFileSync(cssPath, 'utf-8')
        outputCss += fs.readFileSync(cssPath, 'utf-8')
      }

      const jsPath = path.resolve(modulePath, '../../umd/index.js')
      outputJs += fs.readFileSync(jsPath, 'utf-8')
    }

    fs.ensureDirSync(outputPath)

    if (outputCss) {
      fs.writeFileSync(`${outputPath}/univer.umd.css`, outputCss)
      consola.success(t('bundle.success.css'))
    }

    fs.writeFileSync(`${outputPath}/univer.umd.js`, outputJs)
    consola.success(t('bundle.success.js'))
  } catch (error) {
    // If the user force closes the prompt, exit the process
    if (error.message.startsWith('User force closed the prompt')) {
      consola.info(t('error.exit'))
    } else {
      consola.error(error)
    }
  }
}

import process from 'node:process'
import { resolve } from 'node:path'

import fs from 'fs-extra'
import { confirm, input, select } from '@inquirer/prompts'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import type { ICliOptions, ITemplateData } from '../types'
import { CliModeType } from '../types'
import { traverseDirectory } from '../utils/convert'
import { __dirname } from '../utils/path'
import { t } from '../i18n'

function covertToPascalCase(str: string) {
  return str
    .replace(/\b\w/g, (match) => {
      return match.toUpperCase()
    })
    .replace(/-/g, '')
}

export function createProject(fromDir: string, toDir: string, projectName: string): void {
  const data: ITemplateData = {
    GITIGNORE: '.gitignore',
    PROJECT_NAME: projectName,
    PROJECT_UPPER_NAME: covertToPascalCase(projectName),
  }

  fs.copySync(fromDir, toDir, { overwrite: true })

  traverseDirectory(toDir, data)
}

export async function create(options: ICliOptions) {
  // If the mode is not one of the ModeType values, throw an error
  if (options.mode && !Object.values(CliModeType).includes(options.mode)) {
    throw new Error('Invalid argument: mode')
  }

  const mode = options.mode ?? CliModeType.NORMAL

  const templatesPath = resolve(__dirname, '../templates', mode)
  const templates = fs.readdirSync(templatesPath)

  try {
    const answer = {
      path: await input({
        message: t('create.choices.path'),
        default: process.cwd(),
      }),
      template: await select({
        message: t('create.choices.template'),
        choices: templates.map(template => ({
          value: template,
          required: true,
        })),
      }),
      projectName: await input({
        message: t('create.choices.projectName'),
        validate: (input) => {
          if (!input.trim()) {
            return t('create.choices.projectName.validate')
          }

          return true
        },
      }),
    }

    const { path, template, projectName } = answer

    await confirm({
      message: t('create.choices.confirm', colors.cyan(path), colors.cyan(template), colors.cyan(projectName)),
      default: true,
    })

    const fromDir = resolve(templatesPath, template)

    // If the path already exists, throw an error
    if (fs.existsSync(path)) {
      throw new Error(`❌ The path ${colors.yellow(path)} already exists`)
    }

    createProject(fromDir, path, projectName)

    consola.success(t('create.success'))
  } catch (error) {
    // If the user force closes the prompt, exit the process
    if (error.message.startsWith('User force closed the prompt')) {
      consola.info(t('error.exit'))
    } else {
      consola.error(error)
    }
  }
}

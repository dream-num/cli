import { resolve } from 'node:path'
import fs from 'fs-extra'
import { input, confirm, select } from '@inquirer/prompts'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { CliModeType, ICliOptions, ITemplateData } from '../types'
import { traverseDirectory } from '../utils/convert'
import { __dirname } from '../utils/path'

function covertToPascalCase (str: string) {
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
    PROJECT_UPPER_NAME: covertToPascalCase(projectName)
  }

  fs.copySync(fromDir, toDir, { overwrite: true })

  traverseDirectory(toDir, data)
}

export async function create (options: ICliOptions) {
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
        message: '📝 Please input a path to create a new plugin',
        default: process.cwd()
      }),
      template: await select({
        message: '📦 Which template would you like to use?',
        choices: templates.map((template) => ({
          value: template,
          required: true
        }))
      }),
      projectName: await input({
        message: '📌 Please input a new plugin name',
        validate: (input) => {
          if (!input.trim()) {
            return 'The plugin name cannot be empty'
          }

          return true
        }
      })
    }
  
    const { path, template, projectName } = answer
  
    await confirm({
      message: `🤔 Please confirm your choice:\n` +
        `The target path: ${colors.cyan(path)}\n` +
        `The template you choose is ${colors.cyan(template)}.\n` +
        `The plugin name is ${colors.cyan(projectName)}.\n` + 
        'Continue to create a new plugin?',
      default: true
    })
    
    const fromDir = resolve(templatesPath, template)

    // If the path already exists, throw an error
    if (fs.existsSync(path)) {
      throw new Error(`❌ The path ${colors.yellow(path)} already exists`)
    }
  
    createProject(fromDir, path, projectName)

    // When the mode is univer, check if the tsconfig.json exists
    if (mode === CliModeType.UNIVER) {
      const tsConfigPath = resolve(path, '../../tsconfig.json')

      if (!fs.existsSync(tsConfigPath)) {
        throw new Error(`Cannot find tsconfig.json in ${colors.yellow(path)}, please check it`)
      }

      const tsConfig = fs.readJSONSync(tsConfigPath)

      const packagesPath = fs.readdirSync(resolve(path, '../'))

      tsConfig.references = packagesPath.map((packagePath) => ({
        path: `./packages/${packagePath}`
      }))

      fs.writeJSONSync(tsConfigPath, tsConfig, { spaces: 4 })
    }

    consola.success('🎉 Successfully created a new plugin!')
  } catch (error) {
    // If the user force closes the prompt, exit the process
    if (error.message.startsWith('User force closed the prompt')) {
      consola.info('Goodbye 👋')
    } else {
      console.error(error)
    }
  }
}

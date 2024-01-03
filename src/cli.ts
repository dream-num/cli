import { resolve } from 'node:path'
import fs from 'fs-extra'
import { input, confirm, select } from '@inquirer/prompts'
import chalk from 'chalk'
import { createProject } from './create'
import { CliModeType, ICliOptions } from './types'

export async function cli (options: ICliOptions) {
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
        `The target path: ${chalk.underline.cyan(path)}\n` +
        `The template you choose is ${chalk.cyan(template)}.\n` +
        `The plugin name is ${chalk.cyan(projectName)}.\n` + 
        'Continue to create a new plugin?',
      default: true
    })
    
    const fromDir = resolve(templatesPath, template)

    // If the path already exists, throw an error
    if (fs.existsSync(path)) {
      throw new Error(`The path ${chalk.underline.yellow(path)} already exists`)
    }
  
    createProject(fromDir, path, projectName)

    // When the mode is univer, check if the tsconfig.json exists
    if (mode === CliModeType.UNIVER) {
      const tsConfigPath = resolve(path, '../../tsconfig.json')

      if (!fs.existsSync(tsConfigPath)) {
        throw new Error(`Cannot find tsconfig.json in ${chalk.underline.yellow(path)}, please check it`)
      }

      const tsConfig = fs.readJSONSync(tsConfigPath)

      const packagesPath = fs.readdirSync(resolve(path, '../'))

      tsConfig.references = packagesPath.map((packagePath) => ({
        path: `./packages/${packagePath}`
      }))

      fs.writeJSONSync(tsConfigPath, tsConfig, { spaces: 4 })
    }

    console.log(chalk.green('🎉 Successfully created a new plugin!'))
  } catch (error) {
    // If the user force closes the prompt, exit the process
    if (error.message.startsWith('User force closed the prompt')) {
      console.log(chalk.blue('Goodbye 👋'))
    } else {
      console.error(error)
    }
  }
}

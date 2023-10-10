import { resolve } from 'node:path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import { __dirname } from './utils/path'
import { traverseDirectory } from './utils/convert'
import type { ITemplateData } from './types'

const templates = fs.readdirSync(resolve(__dirname, '../templates'))

const questions = [{
  type: 'list',
  name: 'template',
  message: 'What template would you like to use?',
  choices: templates,
  required: true
}, {
  type: 'input',
  name: 'projectName',
  message: 'Please input a new plugin name:',
  required: true
}]

function createProject(fromDir: string, toDir: string, projectName: string): void {
  const data: ITemplateData = {
    GITIGNORE: '.gitignore',
    PROJECT_NAME: projectName
  }

  fs.copySync(fromDir, toDir, { overwrite: true })

  traverseDirectory(toDir, data)
}

export async function create (path: string) {
  try {
    const { template, projectName } = await inquirer.prompt(questions)

    const fromDir = resolve(__dirname, `../templates/${template}`)
    const toDir = resolve(path)  

    createProject(fromDir, toDir, projectName)
  } catch (error: any) {
    console.error(error)
  }
}

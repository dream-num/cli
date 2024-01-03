import fs from 'fs-extra'
import { traverseDirectory } from './utils/convert'
import type { ITemplateData } from './types'

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

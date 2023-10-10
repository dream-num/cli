import fs from 'fs-extra'
import { join } from 'node:path'
import ejs from 'ejs'
import type { ITemplateData } from '../types'

export function traverseDirectory(dir: string, data: ITemplateData) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = join(dir, file)
    const isDirectory = fs.statSync(filePath).isDirectory()

    if (isDirectory) {
      traverseDirectory(filePath, data)
    } else {
      // 1. rename filename
      const newFilePath = ejs.render(filePath, data)
      fs.renameSync(filePath, newFilePath)

      // 2. replace file content
      const content = fs.readFileSync(newFilePath, 'utf-8')
      const newContent = ejs.render(content, data)
      fs.writeFileSync(newFilePath, newContent, 'utf-8')
    }
  }
}

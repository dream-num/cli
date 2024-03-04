import { execSync } from 'node:child_process'
import consola from 'consola'

export async function isGitRepository(directory: string) {
  try {
    const repoStdout = execSync('git rev-parse --is-inside-work-tree', { cwd: directory })

    const isRepo = repoStdout.includes('true')
    if (!isRepo) {
      return false
    }

    const urlStdout = execSync('git config --get remote.origin.url', { cwd: directory })

    const url = urlStdout.toString().trim()
    return url.includes('github.com/dream-num/') || url.includes('github.com:dream-num/')
  } catch (error) {
    consola.error('The directory is not a git repository', error)

    return false
  }
}

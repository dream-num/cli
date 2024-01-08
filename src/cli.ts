import { select } from '@inquirer/prompts'
import { consola } from 'consola'
import { box } from 'consola/utils'
import { create } from './create'
import { bundle } from './bundle'
import { CliModeType, ICliOptions } from './types'

export async function cli (options: ICliOptions) {
  try {
    // If the mode is not one of the ModeType values, throw an error
    if (options.mode && !Object.values(CliModeType).includes(options.mode)) {
      throw new Error('Invalid argument: mode')
    }

    const mode = options.mode ?? CliModeType.NORMAL

    const feature = await select({
      message: box('👋 Hey, what do you want to do today?'),
      choices: [{
        name: '🔌 Create a new univer plugin',
        value: create
      }, {
        name: '📦 Build your own UMD bundle',
        value: bundle
      }]
    })

    feature({ mode })
  } catch (error) {
    consola.info('Goodbye 👋')
  }
}

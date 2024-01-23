import { select } from '@inquirer/prompts'
import { consola } from 'consola'
import { localeInstance, t } from './i18n'
import { create } from './create'
import { bundle } from './bundle'
import type { ICliOptions } from './types'
import { CliModeType } from './types'

export async function cli(options: ICliOptions) {
  try {
    // If the mode is not one of the ModeType values, throw an error
    if (options.mode && !Object.values(CliModeType).includes(options.mode)) {
      throw new Error('Invalid argument: mode')
    }

    const mode = options.mode ?? CliModeType.NORMAL
    if (options.locale) {
      localeInstance.setLang(options.locale)
    }

    const feature = await select({
      message: t('cli.feature.message'),
      choices: [{
        name: t('cli.feature.choices.create'),
        value: create,
      }, {
        name: t('cli.feature.choices.bundle'),
        value: bundle,
      }],
    })

    feature({ mode })
  } catch (error) {
    consola.info(t('error.exit'))
  }
}

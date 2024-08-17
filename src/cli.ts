import { select } from '@inquirer/prompts'
import { consola } from 'consola'
import { localeInstance, t } from './i18n'
import { create } from './create'
import type { ICliOptions } from './types'

export async function cli(options: ICliOptions) {
  try {
    if (options.locale) {
      localeInstance.setLang(options.locale)
    }

    const feature = await select({
      message: t('cli.feature.message'),
      choices: [{
        name: t('cli.feature.choices.create'),
        value: create,
      }],
    })

    feature()
  } catch (error) {
    consola.info(t('error.exit'))
    consola.error(error)
  }
}

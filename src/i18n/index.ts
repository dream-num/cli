
import { osLocaleSync } from 'os-locale'
import enUS from './en-US'
import zhCN from './zh-CN'

// The default locale
const DEFAULT_LOCALE = 'en-US'

const locales: Record<string, Record<string, string>> = {
  'en-US': enUS,
  'zh-CN': zhCN
}

class Locale {
  locale = osLocaleSync()

  constructor (locale?: string) {
    this.setLang(locale ?? osLocaleSync())
  }

  setLang (locale: string) {
    this.locale = locale
  }

  getLang () {
    return this.locale
  }
}

export const localeInstance = new Locale()

/**
 * Get the translation of the specified key
 * @param {string} key - The key to be translated
 * @returns {string} The translation of the specified key
 * @example
 * t('cli.feature.message')
 */
export function t (key: string) {
  const locale = localeInstance.getLang()

  if (locales[locale] && locales[locale][key]) {
    return locales[locale][key]
  }

  return locales[DEFAULT_LOCALE][key]
}

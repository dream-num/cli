import { osLocaleSync } from 'os-locale'
import enUS from './en-US'
import zhCN from './zh-CN'

// The default locale
const DEFAULT_LOCALE = 'en-US'

const locales: Record<string, Record<string, string>> = {
  'en-US': enUS,
  'zh-CN': zhCN,
}

class Locale {
  locale = osLocaleSync()

  constructor(locale?: string) {
    this.setLang(locale ?? osLocaleSync())
  }

  setLang(locale: string) {
    this.locale = locale
  }

  getLang() {
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
export function t(key: keyof typeof enUS, ...args: string[]) {
  const locale = localeInstance.getLang()

  let result = ''
  if (locales[locale] && locales[locale][key]) {
    result = locales[locale][key]
  } else {
    result = locales[DEFAULT_LOCALE][key]
  }

  if (args.length) {
    args.forEach((arg, index) => {
      result = result.replace(`{${index}}`, arg)
    })
  }

  return result
}

import type enUS from './en-US'

const locale: typeof enUS = {
  'cli.feature.message': '👋 嘿，今天想做什么？',
  'cli.feature.choices.create': '🔌 创建一个新的 univer 插件',

  'create.choices.path': '📝 请输入要创建新插件的路径',
  'create.choices.template': '📦 请选择模板',
  'create.choices.projectName': '📌 请输入新插件的名称',
  'create.choices.projectName.validate': '插件名称不能为空',
  'create.choices.projectVersion': '🧩 请输入插件版本',
  'create.choices.confirm': '🤔 请确认你的选择:\n'
  + '目标路径: {0}\n'
  + '你选择的模板是 {1}\n'
  + '插件名称是 {2}\n'
  + '确认？',
  'create.success': '🎉 成功创建一个新插件',

  'error.exit': '再见 👋',
}

export default locale

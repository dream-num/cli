export enum CliModeType {
  NORMAL = 'normal',
  UNIVER = 'univer'
}

export interface ICliOptions {
  mode?: CliModeType
}

export interface ITemplateData {
  GITIGNORE: string
  PROJECT_NAME: string
  PROJECT_UPPER_NAME: string
}

import { Command } from 'commander'
import { init } from './init'

const program = new Command()

program
  .command('init')
  .argument('<path>', '[string] The path to the new plugin')
  .option('-t, --template <template>', '[string] The template to use')
  .description('Create a Univer plugin from a template')
  .action(init)

program.parse(process.argv)

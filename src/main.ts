import { Command } from 'commander'
import { create } from './create'

const program = new Command()

program
  .command('create')
  .argument('<path>', '[string] The path to the new plugin')
  .description('Create a Univer plugin from a template')
  .action(create)

program.parse(process.argv)

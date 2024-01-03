import { Command, Option } from 'commander'
import { cli } from './cli'

const program = new Command()

program
  .description('Easily extend univer via cli')
  .addOption(new Option('-m, --mode <mode>', '[string] special mode').hideHelp())
  .action(cli)

program.parse(process.argv)

#!/usr/bin/env node
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Cloner } from './cloner';

yargs(hideBin(process.argv))
  .scriptName("issue-cloner")
  .usage('$0 <cmd> [args]')
  .command('clone', 'Clone issues from one repository to another', (yargs) => {
    yargs.option('config', {
        alias: 'c',
        type: 'string',
        default: './config.json',
        describe: 'Path to the configuration file'
    }).option('dry-run', {
        type: 'boolean',
        default: false,
        describe: 'Perform a trial run without making any changes'
    })
  }, async function (argv) {
    try {
      const cloner = new Cloner(argv.config);
      await cloner.cloneIssues(argv.dryRun);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred.');
      }
      process.exit(1);
    }
  })
  .version()
  .alias('version', 'v')
  .help()
  .alias('help', 'h')
  .argv;

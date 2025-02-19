#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import welcome from "conwelcome";
import createDirectoryContents from './createDirectoryContents.js';
import installDependencies from './installDependencies.js';
import checkForUpdates from './checkUpdates.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');
const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;
const CURR_DIR = process.cwd();

const __dirname = dirname(fileURLToPath(import.meta.url));

checkForUpdates();
const getTemplateChoices = () => {
  try {
    return fs.readdirSync(path.join(__dirname, 'templates'));
  } catch (err) {
    console.error('Error reading templates directory:', err);
    process.exit(1);
  }
};
welcome({
	title: `${PACKAGE_NAME}`,
	tagLine: `by sumangal karan`,
	description: `❤️🚀👍SkeleCLI is  the best CLI tool for creating new projects!👨‍🏭✅🚀`,
	bgColor: `#fadc5e`,
	color: `#000000`,
	bold: true,
	clear: true,
	version: `v${CURRENT_VERSION}`,
});

const QUESTIONS = [
  {
    name: 'projectChoice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: getTemplateChoices(),
  },
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: input =>
      /^([A-Za-z\-\_\d\.])+$/.test(input) || 'Project name may only include letters, numbers, underscores, and dashes.',
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const { projectChoice, projectName } = answers;
  const templatePath = path.join(__dirname, 'templates', projectChoice);
  const projectPath = projectName === '.' ? CURR_DIR : path.join(CURR_DIR, projectName);

  if (!fs.existsSync(templatePath)) {
    console.error('Selected template does not exist. Please check your templates folder.');
    process.exit(1);
  }

  try {
    if (fs.existsSync(projectPath) && projectName !== '.') {
      console.error('Project folder already exists. Please choose a different name.');
      process.exit(1);
    }
    if(projectPath!=='.' && !fs.existsSync(projectPath)){
      fs.mkdirSync(projectPath);
    }

    createDirectoryContents(templatePath, projectName);
    console.log(`\n✅ Project ${projectName === '.' ? 'created in current directory' : projectName} successfully!`);
    installDependencies(projectPath);
  } catch (err) {
    console.error('Error creating project:', err);
    process.exit(1);
  }
});

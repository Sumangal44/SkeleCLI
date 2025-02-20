#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import welcome from 'conwelcome';
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

/**
 * Fetches available template choices from the templates directory.
 * @returns {string[]} List of available template choices.
 */
const getTemplateChoices = () => {
  const templatePath = path.join(__dirname, 'templates');
  
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Templates directory not found. Please ensure templates exist.');
    process.exit(0);
  }

  const templates = fs.readdirSync(templatePath);
  if (templates.length === 0) {
    console.error('❌ No templates available. Please add templates to the templates folder.');
    process.exit(0);
  }

  return templates;
};

/**
 * Displays a welcome message.
 */
const displayWelcomeMessage = () => {
  welcome({
    title: PACKAGE_NAME,
    tagLine: 'by Sumangal Karan',
    description: '❤️🚀👍 SkeleCLI is the best CLI tool for creating new projects! 👨‍🏭✅🚀',
    bgColor: '#fadc5e',
    color: '#000000',
    bold: true,
    clear: true,
    version: `${CURRENT_VERSION}`,
  });
};

/**
 * Prompts user for project details.
 * @returns {Promise<Object>} User's selected project template and name.
 */
const askProjectDetails = async () => {
  return await inquirer.prompt([
    {
      name: 'projectChoice',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: getTemplateChoices(),
    },
    {
      name: 'projectName',
      type: 'input',
      message: 'Enter a project name:',
      validate: input =>
        /^([A-Za-z\-\_\d\.])+$/.test(input) || 'Project name may only include letters, numbers, underscores, and dashes.',
    },
  ]);
};

/**
 * Handles existing project folder.
 * @param {string} projectPath - The project directory path.
 * @returns {Promise<boolean>} Whether to continue creating the project.
 */
const handleExistingProject = async (projectPath) => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: `🚨 The folder "${path.basename(projectPath)}" already exists. What would you like to do?`,
      choices: [
        { name: '❌ Remove all files and create a new project', value: 'remove' },
        { name: '✏️ Overwrite existing files (keep other files)', value: 'overwrite' },
        { name: '🚪 Stop and exit', value: 'stop' },
      ],
    },
  ]);

  if (action === 'remove') {
    console.log(`🗑️ Removing existing project folder: ${path.basename(projectPath)}`);
    fs.rmSync(projectPath, { recursive: true, force: true });
    fs.mkdirSync(projectPath, { recursive: true });
    return true;
  }

  if (action === 'overwrite') {
    console.log('✏️ Overwriting files while keeping the existing structure.');
    return true;
  }

  console.log('🚫 Operation canceled.');
  process.exit(0);
};

/**
 * Creates the project from the selected template.
 * @param {string} templateName - The chosen template name.
 * @param {string} projectName - The project name.
 */
const createProject = async (templateName, projectName) => {
  const templatePath = path.join(__dirname, 'templates', templateName);
  const projectPath = projectName === '.' ? CURR_DIR : path.join(CURR_DIR, projectName);

  if (!fs.existsSync(templatePath)) {
    console.error('❌ Selected template does not exist. Please check your templates folder.');
    process.exit(0);
  }

  if (fs.existsSync(projectPath)) {
    await handleExistingProject(projectPath);
  } else {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  try {
    createDirectoryContents(templatePath, projectPath);
    console.log(`\n✅ Project ${projectName === '.' ? 'created in current directory' : projectName} successfully!`);
    installDependencies(projectPath);
  } catch (err) {
    console.error('❌ Error creating project:', err);
    process.exit(0);
  }
};

// 🌟 Run CLI Tool
(async () => {
  try {
    checkForUpdates(); // Check for updates before starting
    displayWelcomeMessage();

    const { projectChoice, projectName } = await askProjectDetails();
    await createProject(projectChoice, projectName);
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
      console.log('🚫 Operation canceled by user.');
      process.exit(0); // ✅ Exit normally without error
    }
  }
})();

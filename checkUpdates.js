import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import inquirer from 'inquirer';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;

/**
 * Get the latest version of the package from npm
 */
function getLatestVersion() {
  const npmPath = findCommand('npm');
  if (!npmPath) {
    console.error('❌ NPM is not installed or not in PATH.');
    return null;
  }

  const result = spawnSync(npmPath, ['view', PACKAGE_NAME, 'version'], { encoding: 'utf-8' });

  if (result.error) {
    console.error('❌ Failed to fetch latest version from npm. Debug Info:', result.error.message);
    return null;
  }

  const latestVersion = result.stdout?.trim();
  return latestVersion || null;
}

/**
 * Check for updates and prompt the user
 */
async function checkForUpdates() {
  console.log('🔍 Checking for updates...');

  const latestVersion = getLatestVersion();

  if (!latestVersion) {
    console.error('❌ Unable to check for updates. Ensure you have an active internet connection.');
    return;
  }

  if (latestVersion !== CURRENT_VERSION) {
    console.log(`🚀 A new version (${latestVersion}) of ${PACKAGE_NAME} is available!`);

    const { update } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'update',
        message: 'Would you like to update now?',
        default: true,
      }
    ]);

    if (update) {
      return updateCLI();
    }
  } else {
    console.log('✅ You are using the latest version.');
  }
}

/**
 * Update the CLI
 */
function updateCLI() {
  console.log('🔄 Updating...');

  const packageManager = detectPackageManager();
  if (!packageManager) {
    console.error('❌ No package manager found. Install npm, pnpm, yarn, or bun.');
    return;
  }

  const installCommand = getInstallCommand(packageManager);
  console.log(`⚡ Running: ${packageManager} ${installCommand}`);

  const updateResult = spawnSync(packageManager, installCommand.split(' '), { stdio: 'inherit' });

  if (updateResult.status === 0) {
    console.log('✅ Update complete! Restart the CLI to use the latest version.');
    process.exit(0);
  } else {
    console.error('❌ Update failed. Try running the update command manually.');
  }
}

/**
 * Detects the available package manager
 */
function detectPackageManager() {
  const managers = ['pnpm', 'npm', 'yarn', 'bun'];
  for (const manager of managers) {
    if (findCommand(manager)) return manager;
  }
  return null;
}

/**
 * Returns the correct install command for the given package manager
 */
function getInstallCommand(manager) {
  switch (manager) {
    case 'pnpm': return `add -g ${PACKAGE_NAME}`;
    case 'yarn': return `global add ${PACKAGE_NAME}`;
    case 'bun': return `add -g ${PACKAGE_NAME}`;
    default: return `install -g ${PACKAGE_NAME}`;
  }
}

/**
 * Finds the absolute path of a command (fixes "spawnSync ENOENT" issue).
 */
function findCommand(command) {
  const result = spawnSync('where', [command], { encoding: 'utf-8' });

  if (result.status !== 0 || !result.stdout) return null;
  return result.stdout.trim().split('\n')[0];
}

export default checkForUpdates;

import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));
const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;

/**
 * Get the latest version of the package from npm
 */
function getLatestVersion() {
  const result = spawnSync('npm', ['view', PACKAGE_NAME, 'version'], { encoding: 'utf-8' });

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
    if (commandExists(manager)) return manager;
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
 * Checks if a command exists on the system.
 */
function commandExists(cmd) {
  const result = spawnSync(cmd, ['--version'], { stdio: 'ignore' });
  return result.status === 0;
}

export default checkForUpdates;

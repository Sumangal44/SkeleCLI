import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

// Load package.json dynamically
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;

/**
 * Check for updates and prompt the user to update if a new version is available.
 */
async function checkForUpdates() {
  try {
    console.log('🔍 Checking for updates...');

    // Fetch latest version from npm
    const result = spawnSync('npm', ['view', PACKAGE_NAME, 'version'], { encoding: 'utf-8' });

    if (result.error) {
      console.error('❌ Unable to check for updates. Ensure you have an active internet connection.');
      return;
    }

    const latestVersion = result.stdout.trim();
    if (!latestVersion) {
      console.error('❌ Failed to fetch latest version from npm.');
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
    } else {
      console.log('✅ You are using the latest version.');
    }
  } catch (error) {
    console.error('❌ Error checking for updates:', error.message);
  }
}

/**
 * Detects the available package manager (pnpm, npm, yarn, or bun).
 * @returns {string|null} - The package manager name or null if none found.
 */
function detectPackageManager() {
  const managers = ['pnpm', 'npm', 'yarn', 'bun'];
  for (const manager of managers) {
    if (commandExists(manager)) return manager;
  }
  return null;
}

/**
 * Returns the correct install command for the given package manager.
 * @param {string} manager - The package manager name.
 * @returns {string} - The install command.
 */
function getInstallCommand(manager) {
  switch (manager) {
    case 'pnpm': return 'add -g ' + PACKAGE_NAME;
    case 'yarn': return 'global add ' + PACKAGE_NAME;
    case 'bun': return 'add -g ' + PACKAGE_NAME;
    default: return 'install -g ' + PACKAGE_NAME;
  }
}

/**
 * Checks if a command exists on the system.
 * @param {string} cmd - The command to check.
 * @returns {boolean} - True if the command exists, false otherwise.
 */
function commandExists(cmd) {
  const result = spawnSync(cmd, ['--version'], { stdio: 'ignore' });
  return result.status === 0;
}

export default checkForUpdates;

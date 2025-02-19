import { spawnSync } from 'child_process';
import { createRequire } from 'module';
import inquirer from 'inquirer';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;

/**
 * Check for updates and prompt the user to update if a new version is available.
 */
async function checkForUpdates() {
  try {
    console.log('🔍 Checking for updates...');

    // Fetch latest version from npm
    const latestVersion = spawnSync('npm', ['view', PACKAGE_NAME, 'version'], {
      encoding: 'utf-8'
    }).stdout?.trim();

    if (!latestVersion) {
      console.error('❌ Unable to check for updates. Please ensure you have an active internet connection.');
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

        const packageManagers = ['pnpm', 'npm', 'yarn', 'bun'];
        const availableManager = packageManagers.find(pm => commandExists(pm));

        if (!availableManager) {
          console.error('❌ No package manager found. Please install pnpm, npm, yarn, or bun.');
          return;
        }

        const result = spawnSync(availableManager, ['add', '-g', PACKAGE_NAME], { stdio: 'inherit' });

        if (result.status === 0) {
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
 * Checks if a command exists on the system.
 * @param {string} cmd - The command to check.
 * @returns {boolean} - True if the command exists, false otherwise.
 */
function commandExists(cmd) {
  return spawnSync(cmd, ['--version'], { stdio: 'ignore' }).status === 0;
}

export default checkForUpdates;

import { execSync } from 'child_process';
import { createRequire } from 'module';
import inquirer from 'inquirer';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;

async function checkForUpdates() {
  try {
    const latestVersion = execSync(`npm view ${PACKAGE_NAME} version`, { encoding: 'utf-8' }).trim();

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
        try {
          execSync(`npx pnpm add -g ${PACKAGE_NAME}`, { stdio: 'inherit' });
          console.log('✅ Update complete! Restart the CLI to use the latest version.');
          process.exit(0);
        } catch (updateError) {
          console.error('❌ Update failed:', updateError.message);
        }
      }
    } else {
      console.log('✅ You are using the latest version.');
    }
  } catch (error) {
    console.error('❌ Error checking for updates:', error.message);
  }
}

export default checkForUpdates;

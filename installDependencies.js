import { execSync } from 'child_process';

/**
 * Installs dependencies in the given project path using the best available package manager.
 * @param {string} projectPath - The directory where dependencies should be installed.
 */
export default function installDependencies(projectPath) {
  const packageManagers = ['pnpm', 'npm', 'yarn', 'bun'];

  try {
    console.info('📦 Installing dependencies...');

    const availableManager = packageManagers.find(cmd => commandExists(cmd));

    if (!availableManager) {
      throw new Error('❌ No package manager found. Please install pnpm, npm, yarn, or bun.');
    }

    console.info(`⚡ Using ${availableManager} to install dependencies...`);
    execSync(`${availableManager} install`, { stdio: 'inherit', cwd: projectPath });

    console.info('✅ Dependencies installed successfully!');
  } catch (err) {
    console.error('❌ Failed to install dependencies:', err.message);
    process.exit(1);
  }
}

/**
 * Checks if a command exists in the system PATH.
 * @param {string} cmd - The command to check.
 * @returns {boolean} - Returns true if the command exists, false otherwise.
 */
function commandExists(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

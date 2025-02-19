import { execSync } from 'child_process';

export default function installDependencies(projectPath) {
  try {
    console.log('Installing dependencies...');
    if (commandExists('pnpm')) {
      console.log('Using pnpm to install dependencies...');
      execSync('pnpm install', { stdio: 'inherit', cwd: projectPath });
    } else if (commandExists('npm')) {
      console.log('pnpm not found, using npm instead...');
      execSync('npm install', { stdio: 'inherit', cwd: projectPath });
    } else if (commandExists('yarn')) {
      console.log('pnpm and npm not found, using yarn instead...');
      execSync('yarn install', { stdio: 'inherit', cwd: projectPath });
    } else if (commandExists('bun')) {
      console.log('pnpm, npm, and yarn not found, using bun instead...');
      execSync('bun install', { stdio: 'inherit', cwd: projectPath });
    } else {
      throw new Error('No package manager found. Please install pnpm, npm, yarn, or bun.');
    }
    console.log('Dependencies installed successfully!');
  } catch (err) {
    console.error('Failed to install dependencies:', err);
    process.exit(1);
  }
}

function commandExists(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

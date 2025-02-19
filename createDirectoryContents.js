import fs from 'fs';
import path from 'path';

/**
 * Copies template files to the target project directory.
 * @param {string} templatePath - Path to the template directory.
 * @param {string} projectPath - Path to the project directory.
 */
const createDirectoryContents = (templatePath, projectPath) => {
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template path not found: ${templatePath}`);
    return;
  }

  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);
    const targetFilePath = path.join(projectPath, file);

    if (fs.statSync(origFilePath).isDirectory()) {
      if (!fs.existsSync(targetFilePath)) {
        fs.mkdirSync(targetFilePath, { recursive: true });
      }
      createDirectoryContents(origFilePath, targetFilePath);
    } else {
      try {
        fs.copyFileSync(origFilePath, targetFilePath);
      } catch (err) {
        console.error(`❌ Error processing "${file}":`, err.message);
      }
    }
  });
};

export default createDirectoryContents;

import * as fs from 'fs';
import path from 'path';

const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);

    try {
      const stats = fs.statSync(origFilePath);

      if (stats.isFile()) {
        let contents = fs.readFileSync(origFilePath, 'utf8');

        let writeFileName = file === '.npmignore' ? '.gitignore' : file;
        const writePath = path.join(CURR_DIR, newProjectPath, writeFileName);

        fs.writeFileSync(writePath, contents, 'utf8');
      } else if (stats.isDirectory()) {
        const newDirPath = path.join(CURR_DIR, newProjectPath, file);
        if (!fs.existsSync(newDirPath)) {
          fs.mkdirSync(newDirPath, { recursive: true });
        }

        createDirectoryContents(origFilePath, path.join(newProjectPath, file));
      }
    } catch (err) {
      console.error(`Error processing file "${file}": ${err.message}`);
    }
  });
};

export default createDirectoryContents;

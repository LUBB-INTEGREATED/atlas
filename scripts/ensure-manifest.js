const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'routes-manifest.template.json');

for (const dirName of ['.next-dev', '.next']) {
  try {
    const targetDir = path.join(__dirname, '..', dirName);
    const targetFile = path.join(targetDir, 'routes-manifest.json');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (!fs.existsSync(targetFile) && fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
    }
  } catch {
    // Ignore errors
  }
}

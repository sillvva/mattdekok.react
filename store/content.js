const { existsSync } = require('fs');
const path = require('path');

const getContentDir = () => {
  // Local directory
  let dirPath = path.join(process.cwd(), 'content');
  // Vercel directory, because the cwd() directory is read-only
  if (!existsSync(dirPath) && existsSync('/tmp')) dirPath = '/tmp';
  return dirPath;
}

module.exports = {
  getContentDir
}
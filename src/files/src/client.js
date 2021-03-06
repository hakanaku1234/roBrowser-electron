const Fs = require('fs');
const Path = require('path');

/**
 * @fileoverview Client - File Manager
 * @author Wesley Rosa (alias RavenheartZ - Twitter: @WesleyRosa)
 * @version 1.0.0
 */
module.exports = {
  path: Path.join(__dirname, '..', '..', 'robrowser', 'client'),

  /**
   * Get a file from client, search it on data folder first and then on grf
   *
   * @param {string} path file path
   * @return {Buffer|boolean} success
   */
  getFile(path) {
    const localPath = this.path + path.split('/').join('\\');

    console.log(`Searching file ${path}...`);

    // Read data first
    if (Fs.existsSync(localPath) && !Fs.lstatSync(localPath).isDirectory()) {
      try {
        Fs.accessSync(localPath, Fs.constants.R_OK);
        console.log(`File found at ${localPath}`);
        return Fs.readFileSync(localPath);
      } catch (err) {
        console.error(`File not found at ${localPath}`);
      }
    }
    return false;
  },
};

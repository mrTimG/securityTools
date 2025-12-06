const { exiftool } = require('exiftool-vendored');

const exif = {
  async read(pathToImg) {
    if (!pathToImg) {
      console.log('No image provided');
      return null;
    }
    try {
      const cleanPath = pathToImg.replaceAll("\\", "/")
      const removeQuotes = cleanPath.replaceAll('"','')
      const tags = await exiftool.read(removeQuotes);
      return tags;
    } catch (err) {
      console.error('Error reading EXIF:', err);
      return null;
    } finally {
      await exiftool.end();
    }
  },
  async getBasic(pathToImg) {
    const metaData = await this.read(pathToImg);
    console.log(`Camera: ${metaData.Make} ${metaData.Model}`);
    console.log(`Taken: ${metaData.DateTimeOriginal}`);
    console.log(`Size: ${metaData.ImageWidth}x${metaData.ImageHeight}`);
  },
  async getFull(pathToImg){
    const metaData = await this.read(pathToImg);
    console.log(metaData)
  },

};
module.exports = exif

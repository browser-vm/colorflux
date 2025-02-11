const getPixels = require('get-pixels');
const { extractColors: extract } = require('extract-colors');

const extractColors = async (imagePath) => {
  return new Promise((resolve, reject) => {
    getPixels(imagePath, (err, pixels) => {
      if (err) return reject(err);

      const data = [...pixels.data];
      const [width, height] = pixels.shape;

      extract({ data, width, height })
        .then(colors => {
          resolve({
            dominant: colors[0].hex,
            palette: colors.slice(0, 6).map(c => c.hex)
          });
        })
        .catch(reject);
    });
  });
};

module.exports = { extractColors };
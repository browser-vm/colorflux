const express = require('express');
const router = express.Router();
const { upload } = require('../utils/fileUpload');
const { extractColors } = require('../services/colorService');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const colors = await extractColors(req.file.path);
    res.json({ 
      dominant: colors.dominant,
      palette: colors.palette 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Color extraction failed' });
  }
});

module.exports = router;
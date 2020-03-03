const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

const express = require('express');
const multer = require('multer');

const upload = multer();

const app = express();

app.use(express.static('public'));

async function createRecord(obj) {
  return { id: Math.floor(Math.random() * 1000), shipName: obj.shipName };
}

app.post('/file', upload.single('avatar'), async (req, res, next) => {
  try {
    const { shipName, ...otherFields } = req.body;
    const { file } = req;
    const record = await createRecord({ shipName, ...otherFields });

    const finalFileName = `${record.id}-${shipName}${file.detectedFileExtension}`;
    await pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/files/${finalFileName}`)
    );
    res.send(`File uploaded as ${finalFileName}`);
  } catch (err) {
    console.log('File upload failed', err);
    next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

const express = require('express');
const multer = require('multer');

const upload = multer({
  dest: 'files/',
  limits: {
    fileSize: 100,
  },
});

const app = express();

app.use(express.static('public'));

const uploadMiddleware = upload.single('file');

app.post('/file', (req, res, next) => {
  uploadMiddleware(req, res, err => {
    if (err) {
      console.log('CAUGHT THAT ERROR', err);
      res.send('uh oh baby');
    } else {
      console.log(req.file);
      res.send('File was uploaded');
    }
  });
});

app.use(function(error, req, res, next) {
  if (error) {
    console.log(error);
    res.send('Something bad happened');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

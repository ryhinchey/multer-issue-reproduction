const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'files/' });

const app = express();

app.use(express.static('public'))

app.post('/file', upload.single('file'), (req, res, next) => {
  console.log(req.file);
  res.send(req.file);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

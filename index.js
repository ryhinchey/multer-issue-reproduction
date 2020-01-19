const express = require('express');
const multer = require('multer');
const morgan = require('morgan');


const logger = morgan((tokens, req, res) => {
  //const isGraphql = true;
  const isGraphql = false;

  if (!isGraphql) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms"
    ].join(" ");
  }

  const operationName = 'operation';
  const variables = {};

  return `GQL: ${operationName} (${Object.keys(variables)
    .map(key => `${key}: ${variables[key] && variables[key].toString()}`)
    .join(", ")}) - ${tokens["response-time"](req, res)} ms`;
});

const upload = multer({ dest: 'files/' });

const app = express();

app.use(logger);

app.get('*', (req, res, next) => {
  res.contentType('html');

  res.send(`
    <form action="file" method="post">
      Select image to upload:
      <input type="file" name="file">
      <input type="submit" value="Upload Image" name="submit">
    </form>
  `)
})

app.post('/file', upload.single('file'), (req, res, next) => {
  res.send(req.file);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


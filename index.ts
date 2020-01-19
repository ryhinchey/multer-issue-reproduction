import { MulterError } from 'multer';

const error = new Error('a custom error');
const multerError = new MulterError('a custom multer error');

console.log(error instanceof MulterError);
console.log(multerError instanceof MulterError);
import { Request } from 'express';
import { File } from 'multer';

declare module 'express-serve-static-core' {
  interface Request {
    files?: {
      [fieldname: string]: File[];
    };
    file?: File;
  }
}

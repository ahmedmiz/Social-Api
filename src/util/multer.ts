import multer, { FileFilterCallback } from "multer";  
import { Request } from 'express';  
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { rootPath } from "./path";

type CustomFileFilter = (  
    req: Request,  
    file: Express.Multer.File,  
    cb: FileFilterCallback  
) => void;  
const uploadDir : string  = path.join(rootPath, 'public/images');
const storage = multer.diskStorage({  
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {  
        cb(null, uploadDir);  
    },  
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {  
        // Generate unique filename with original extension
        const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename);  
    }  
});

const fileFilter: CustomFileFilter = (req, file, cb) => {  
    const allowedTypes = ['image/jpeg', 'image/png'];  
    if (allowedTypes.includes(file.mimetype)) {  
        cb(null, true);  
    }  
    else {  
        cb(new Error('invalid file type ')); // or cb(null, false); if you want to silently reject  
    }  
};  
const limits  = {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1
};

const upload = multer({ storage: storage, fileFilter: fileFilter , limits : limits});  
export default upload;  
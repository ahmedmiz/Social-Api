import multer, { FileFilterCallback } from "multer";  
import { Request } from 'express';  


type CustomFileFilter = (  
    req: Request,  
    file: Express.Multer.File,  
    cb: FileFilterCallback  
) => void;  

const storage = multer.diskStorage({  
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {  
        cb(null, 'public/images');  
    },  
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {  
        cb(null, file.originalname);  
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

const upload = multer({ storage: storage, fileFilter: fileFilter });  
export default upload;  
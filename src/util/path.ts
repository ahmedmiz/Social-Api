import path from 'path';

export const rootPath : string  = path.join(__dirname, '../../..');
export const logsPath  : string =path.join(rootPath, 'logs');
export const serverErrorsLogPath: string = path.join(logsPath, 'serverErrorsLogPath');
export const userErrorsLogPath: string = path.join(logsPath, 'userErrorsLogPath');

import express, { Application, NextFunction} from "express";
import Routes from "./routes/index";
import morgan from "morgan";
import fs, { WriteStream } from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { unCaughtErrorHandler } from "./util/errorHandling";
const app: Application = express();



    


    const accessLogStream: WriteStream = fs.createWriteStream(
      path.join("./logs/access.log"),
      { flags: "a" }
    );
    // log all requests to access.log
    app.use(morgan("dev", { stream: accessLogStream }));
    // parse json to javascript object
    app.use(express.json());
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));
    // enable cors from all origins
    app.use(cors());
    // middleware for security
    app.use(helmet());
    new Routes(app);
    app.use(unCaughtErrorHandler);


export { app };
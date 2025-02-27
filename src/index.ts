import express, { Application} from "express";
import Routes from "./routes/index";
import morgan from "morgan";
import fs, { WriteStream } from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { unCaughtErrorHandler } from "./util/errorHandling";
import winston from "winston";
export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }
  public config(app: Application): void {
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
    app.use(unCaughtErrorHandler);
  }
}
process.on('beforeExit', function (err) {
  winston.error(JSON.stringify(err));
  console.error(err);
});
import express, { Application, NextFunction} from "express";
import Routes from "./routes/index";
import morgan from "morgan";
import fs, { WriteStream } from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { unCaughtErrorHandler } from "./util/errorHandling";
import rateLimit from "express-rate-limit";
const app: Application = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

const uploadDir = path.join(__dirname, 'public/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


    const accessLogStream: WriteStream = fs.createWriteStream(
      path.join("./logs/access.log"),
      { flags: "a" }
    );
    app.use(limiter)
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
    app.use('/public', express.static('uploadDir'));
    new Routes(app);
    app.use(unCaughtErrorHandler);


export { app };
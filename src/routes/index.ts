import authRoute from "./auth";
import postsRoute from "./feed";
import usersRoute from "./users";
import { Application } from "express";

export default class Routes {
  constructor(app: Application) {
    app.use("/auth", authRoute);
    app.use("/feed", postsRoute);
    app.use("/users", usersRoute);
  }
}

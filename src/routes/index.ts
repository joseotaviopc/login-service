import { Router } from "express";
const routes = Router();

import { SessionController, GetAllUsers, CreateUsers } from "../controllers";

routes.get("/", GetAllUsers);
routes.post("/login", SessionController);
routes.post("/newuser", CreateUsers);
export default routes;

import dotenv from "dotenv";
import express from "express";
import routes from "./routes";

dotenv.config();
const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use("/", routes);
server.listen(port, () =>
	console.log(`🚀 Login Server running on port:${port}`)
);

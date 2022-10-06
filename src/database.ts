import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = String(process.env.MONGO_URL);

const connect = async (tries = 1) => {
	try {
		await mongoose.connect(MONGO_URL);
		console.log("Conectado ao banco");
	} catch (e) {
		console.error("Sem conexão com o banco", e);
		setTimeout(() => connect(tries + 1), 3000 ** tries);
		// "Backoff" tenta várias vezes se conectar
	}
};

connect();

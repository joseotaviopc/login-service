import yup from "yup";
import { client as redis } from "../config/redis";
import { getUserByEmail, checkPassword, getAllUsers } from "../services";

export const SessionController = async (req: any, res: any) => {
	console.log(req.body);
	const { email, password } = req.body;
	try {
		// const schema = yup.object().shape({
		// 	email: yup.string().email().required(),
		// 	password: yup.string().min(8).required(),
		// });

		// if (!(await schema.isValid({ email, password }))) {
		// 	throw { status: 400, message: "Validação falhou" };
		// }

		const user = await getUserByEmail(email);
		const validPassword = await checkPassword(email, password);

		if (!user || !validPassword) {
			throw { status: 400, message: "Credenciais inválidas" };
		}

		res.status(200).json({ user: user, message: "Logado" });
	} catch (error: any) {
		console.log(error);
		return res
			.status(error.status || 500)
			.json({ error: error.message || "Server Error" });
	}
};

export const GetAllUsers = async (req: any, res: any) => {
	console.log("Chamou getallusers");
	try {
		const users = await getAllUsers();
		return res.status(200).json({ users: users, message: "Lista de usuários" });
	} catch (error: any) {
		console.log(error);
		return res
			.status(error.status || 500)
			.json({ error: error.message || "Server Error" });
	}
};

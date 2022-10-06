import { createNewUser } from "../models/user";

export const CreateUsers = async (req: any, res: any) => {
	console.log("Chamou create user");
	const { email, password, name, lastName, hash, role } = req.body;
	try {
		const user = await createNewUser(
			email,
			password,
			name,
			lastName,
			hash,
			role
		);
		console.log(user);
		return res.status(200).json({ message: "Usuario criado", user: user });
	} catch (error: any) {
		console.log(error);
		return res
			.status(error.status || 500)
			.json({ error: error.message || "Server Error" });
	}
};

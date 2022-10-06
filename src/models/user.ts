import { model, Schema } from "mongoose";

export interface TUser {
	email: string;
	password: string;
	name: string;
	lastName: string;
	hash: string;
	role: string;
}

const userSchema = new Schema<TUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	hash: { type: String },
	role: { type: String, required: true },
});

const UserModel = model<TUser>("User", userSchema);

export const searchAllUsers = async () => {
	try {
		console.log("Buscando users...");
		return await UserModel.find();
	} catch (error) {
		console.log("Erro:", error);
		return error;
	}
};

export const searchOneUser = async (email: string) => {
	try {
		return await UserModel.find({
			email: email,
		});
	} catch (error) {
		console.log("Erro ao encontrar usuário:", error);
		return error;
	}
};

export const createNewUser = async (
	email: string,
	password: string,
	name: string,
	lastName: string,
	hash: string,
	role: string
) => {
	// const User = await searchOneUser(email);
	// if (User) {
	// 	console.log("Usuário já existe");
	// 	return;
	// }

	const newUser = new UserModel({
		email,
		password,
		name,
		lastName,
		hash,
		role,
	});

	try {
		await newUser.save();
		console.log("Usuário criado com sucesso!");
		return searchOneUser(email);
	} catch (error: any) {
		console.log("Erro ao criar Usuário:", error);
		return error;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const user: TUser | any = await searchOneUser(email);
		if (user) {
			if (user[0].password === password) return user;
		}
	} catch (error) {
		console.log("Erro ao atualizar user:", error);
		return error;
	}
};

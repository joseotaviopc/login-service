import { searchOneUser, loginUser, searchAllUsers } from "../models/user";

// function UserService() {
async function getUserByEmail(email: string) {
	return await searchOneUser(email);
}

async function checkPassword(email: string, password: string) {
	return await loginUser(email, password);
}

async function getAllUsers() {
	return await searchAllUsers();
}

export { getUserByEmail, checkPassword, getAllUsers };

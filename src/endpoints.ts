import { User } from "./user";

export function getAllUsers() {

};

export function getUser(userId: string) {

};

export async function createUser(userData: User, storage: User[]): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let user = new User(userData.username, userData.age, userData.hobbies);
            storage.push(user);
            resolve(user.id);
        } catch (err) {
            reject(err)
        };
    });
};

export function updateUser() {

};

export function deleteUser() {

};

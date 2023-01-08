import { resolveProjectReferencePath } from "typescript";
import { User } from "./user.interface";

export function getAllUsers() {

};

export function getUser(userId: string) {

};

export async function createUser(userData: User, storage: User[]): Promise<string> {
    let id = 'aaabbb';
    return new Promise((resolve, reject) => {
        try {
            let user = {
                id: id,
                username: userData.username,
                age: userData.age,
                hobbies: userData.hobbies
            };
            storage.push(user);
            resolve(id);
        } catch (err) {
            reject(err)
        };
    });
};

export function updateUser() {

};

export function deleteUser() {

};

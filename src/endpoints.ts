import { User } from "./user";
import { validate } from "uuid";
import assert from "assert";


export async function getUser(userId: string, storage: User[]): Promise<User> {
    assert(validate(userId), "Not a valid UUID");
    return new Promise((resolve, reject) => {
        for(let user of storage)
            if (user.id === userId)
                resolve(user);
        reject(new Error("Not found"));
    });
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

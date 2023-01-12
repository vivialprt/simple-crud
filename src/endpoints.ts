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

export async function updateUser(userData: User, userId: string, storage: User[]): Promise<User> {
    return new Promise((resolve, reject) => {
        assert(validate(userId), "Not a valid UUID");
        if (userData.id)
            assert(validate(userData.id), "Not a valid UUID in payload");

        for(let user of storage)
            if (user.id === userId) {
                user.id = userData.id ?? user.id;
                user.username = userData.username ?? user.username;
                user.age = userData.age ?? user.age;
                user.hobbies = userData.hobbies ?? user.hobbies;
                resolve(user);
            };
        reject(new Error("Not found"));
    });
};

export async function deleteUser(userId: string, storage: User[]): Promise<User[]> {
    assert(validate(userId), "Not a valid UUID");
    return new Promise((resolve, reject) => {
        let newStorage = storage.filter(user => {
            return user.id !== userId;
        });
        if (newStorage.length == storage.length)
            reject(new Error("Not found"));
        resolve(newStorage);
    });
};

import {v4 as uuid4 } from "uuid";
import assert from "assert";

export class User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor(username: string, age: number, hobbies: string[]) {
        assert((typeof username) != "undefined", "Please specify username");
        assert((typeof age) != "undefined", "Please specify age");
        assert((typeof hobbies) != "undefined", "Please specify hobbies");

        assert((typeof username) == "string", "Username is not a string");
        assert((typeof age) == "number", "Age is not a number");
        assert(Array.isArray(hobbies), "Hobbies is not an array");
        assert(hobbies.every((element) => (typeof element) == "string"), "Hobbies array contains non-string value");

        this.id = uuid4();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
};

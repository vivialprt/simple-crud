const assert = require('assert');
const request = require('supertest');
const { startServer } = require('../build/server.js');

describe('Testing user creation and retrieving', function () {

    this.beforeAll(function () {
        startServer(5001);
    });

    expectedUsers = [];

    it('Storage is empty', function (done) {
        request('http://localhost:5001')
            .get('/api/users/')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert(res.body, '[]')
                done()
            })
    })

    it('Create user 1', function (done) {
        request('http://localhost:5001')
            .post('/api/users')
            .send('{"username": "aboba", "age": 54, "hobbies": ["politics", "pitsa"]}')
            .expect(201)
            .end(function (err, res) {
                if (err) throw err;
                receivedUser = JSON.parse(res.text);
                assert(receivedUser.username === "aboba");
                assert(receivedUser.age === 54);
                assert(receivedUser.hobbies.length === 2);
                assert(receivedUser.hobbies.includes("politics"));
                assert(receivedUser.hobbies.includes("pitsa"));
                done();
                expectedUsers.push(receivedUser);
            });
    });

    it('Create user 2', function (done) {
        request('http://localhost:5001')
            .post('/api/users')
            .send('{"username": "Ryan Gosling", "age": 42, "hobbies": ["cars", "toothpicks"]}')
            .expect(201)
            .end(function (err, res) {
                if (err) throw err;
                receivedUser = JSON.parse(res.text);
                assert(receivedUser.username === "Ryan Gosling");
                assert(receivedUser.age === 42);
                assert(receivedUser.hobbies.length === 2);
                assert(receivedUser.hobbies.includes("cars"));
                assert(receivedUser.hobbies.includes("toothpicks"));
                done();
                expectedUsers.push(receivedUser);
            });
    });

    it('Get all users with wrong URL', function (done) {
        request('http://localhost:5001')
            .get('/users/')
            .expect(404)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    // it('Get all users', function (done) {
    //     request('http://localhost:5001')
    //         .get('/api/users/')
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) throw err;
    //             let user1, user2 = JSON.parse(res.text);
    //             assert(typeof user1 != 'undefined');
    //             assert(expectedUsers.filter(expUser => expUser.id === user1.id).length > 0);
    //             assert(expectedUsers.filter(expUser => expUser.id === user2.id).length > 0);
    //             for(let expectedUser of expectedUsers) {
    //                 if (user1.id == expectedUser.id) {
    //                     assert(user1.username === expectedUser.username);
    //                     assert(user1.age === expectedUser.age);
    //                     assert(user1.hobbies.length === expectedUser.hobbies.length);
    //                 } else {
    //                     assert(user2.username === expectedUser.username);
    //                     assert(user2.age === expectedUser.age);
    //                     assert(user2.hobbies.length === expectedUser.hobbies.length);
    //                 };
    //             };
    //             done();
    //         });
    // });

    it('Get particular user with incorrect uuid', function (done) {
        let url = '/api/users/username';
        request('http://localhost:5001')
            .get(url)
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Get particular user with non-existent uuid', function (done) {
        let url = '/api/users/17a6e800-f1ad-44d4-ae9d-5edb5663acea';
        request('http://localhost:5001')
            .get(url)
            .expect(404)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Get particular user', function (done) {
        expectedUser = expectedUsers[0];
        let url = '/api/users/' + expectedUser.id;
        request('http://localhost:5001')
            .get(url)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                let user = JSON.parse(res.text);
                assert(user.username === expectedUser.username);
                assert(user.age === expectedUser.age);
                assert(user.hobbies.length === expectedUser.hobbies.length);
                done();
            });
    });

});

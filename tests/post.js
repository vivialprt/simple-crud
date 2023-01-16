const assert = require('assert');
const request = require('supertest');
const { startServer } = require('../build/server.js');

describe('Testing user creation', function () {

    this.beforeAll(function () {
        startServer(5000);
    });

    it('Create user with incorrect username', function (done) {
        request('http://localhost:5000')
            .post('/api/users')
            .send('{"username": 123, "age": 54, "hobbies": ["politics", "pitsa"]}')
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Create user with incorrect age', function (done) {
        request('http://localhost:5000')
            .post('/api/users')
            .send('{"username": "aboba", "age": "54", "hobbies": ["politics", "pitsa"]}')
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Create user with incorrect hobbies', function (done) {
        request('http://localhost:5000')
            .post('/api/users')
            .send('{"username": "aboba", "age": 54, "hobbies": ["politics", "pitsa", 12]}')
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Create user without username', function (done) {
        request('http://localhost:5000')
            .post('/api/users')
            .send('{"age": 54, "hobbies": ["politics", "pitsa"]}')
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Create user without age', function (done) {
        request('http://localhost:5000')
            .post('/api/users')
            .send('{"username": "aboba", "hobbies": ["politics", "pitsa"]}')
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Create user without hobbies', function (done) {
        request('http://localhost:5000')
            .post('/api/users')
            .send('{"username": "aboba", "age": 54}')
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Create normal user', function (done) {
        request('http://localhost:5000')
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
            });
    });

});

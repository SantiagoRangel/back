const request = require('supertest');
const API = 'http://localhost:8080/';
const Chance = require('chance');
var chance = new Chance();

describe('Pruebas para la prueba', () => {
    let randomName = chance.name().replace(' ', '');
    let randomPassword = randomName;
    let randomEmail = (randomName + '@gmail.com').toLowerCase();
    test('POST create new user', async () => {
        const res = await request(API).post('users').send({
            name: randomName,
            email: randomEmail,
            password: randomPassword,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(randomName);
        expect(res.body.email).toEqual(randomEmail);
        expect(res.body.token).toBeDefined();
    });
    test('POST create user que ya existe', async () => {
        const res = await request(API).post('users').send({
            name: randomName,
            email: randomEmail,
            password: randomPassword,
        });
        expect(res.statusCode).toEqual(409);
    });

    let tokenLogin;
    test('POST login user correcto', async () => {
        const res = await request(API).post('users/login').send({
            email: randomEmail,
            password: randomPassword,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(randomName);
        expect(res.body.email).toEqual(randomEmail);
        expect(res.body.token).toBeDefined();
        tokenLogin = res.body.token;
    });

    test('POST login correo que no existe', async () => {
        const res = await request(API)
            .post('users/login')
            .send({
                email: randomEmail + 'asdf',
                password: randomPassword,
            });
        expect(res.statusCode).toEqual(404);
    });
    test('POST login password incorrecta', async () => {
        const res = await request(API)
            .post('users/login')
            .send({
                email: randomEmail,
                password: randomPassword + 'asdf',
            });
        expect(res.statusCode).toEqual(400);
    });

    test('POST Create transaction ', async () => {
        let randomAmount = chance.integer({ min: 1, max: 100000 });
        const res = await request(API).post('transaction').set('authorization', tokenLogin).send({
            amount: randomAmount,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.newTransaction).toBeDefined();
    });

    test('GET obtener historial de transacciones ', async () => {
        const res = await request(API).get('transaction').set('authorization', tokenLogin).send();
        expect(res.statusCode).toEqual(201);
    });

    test('POST obtener restaurantes cerca con token', async () => {
        const res = await request(API).post('restaurants').set('authorization', tokenLogin).send({
            lat: '28.533213',
            long: '-81.361800',
            distance: '2',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.restaruantes).toBeDefined();
    });

    test('POST logout ', async () => {
        const res = await request(API).post('users/logout').send({
            token: tokenLogin,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.newExpiredToken).toBeDefined();
    });

    test('POST obtener restaurantes cerca con token expirado', async () => {
        const res = await request(API).post('restaurants').set('authorization', tokenLogin).send({
            lat: '28.533213',
            long: '-81.361800',
            distance: '2',
        });
        expect(res.statusCode).toEqual(401);
    });
});

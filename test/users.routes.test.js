const supertest = require("supertest");
const server = require("../index");
const pool = require("../config/db_pgsql");
const request = supertest(server);

afterAll(async () => {
    await server.close();
    await pool.connection.close();
});

describe("Users Routes", () => {

    describe("POST /api/user", () => {
        it("should create a new user", async () => {
            const response = await request
                .post("/api/user")
                .send({
                    name: "Prueba",
                    email: "prueba@gmail.com",
                    password: "mhDag2nXOL6UXI20syucfOouQ7ZBldviPYGPwIZrMV7wsBpW5dZjK"
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(201);
            expect(response.body).toStrictEqual({ "items_created": 1 });
        });
    });

    describe("GET /api/user", () => {
        it("should return all users", async () => {
            const response = await request.get("/api/user").expect(200);
            expect(response.body).toEqual(expect.any(Array));
        });
    });

    describe("GET /api/user?email=aloha@gmail.com", () => {
        it("should return a specific user", async () => {
            const response = await request.get("/api/user?email=aloha@gmail.com").expect(200);
            expect(response.body).toEqual(expect.objectContaining([{
                "email": "aloha@gmail.com",
                "logged": true,
                "name": "Aloha",
                "password": "$2b$10$x6qggIEaaFCeNVnUAoFSC.BXLBvGHOs4OG52MJ1d99M.VANiNLjpG",
                "role": "user"
            }]
            ));
        });
    });

    describe("PUT /api/user", () => {
        it("should update an existing user", async () => {
            const response = await request
                .put("/api/user")
                .send({
                    name: "Prueba2",
                    email: "prueba2@gmail.com",
                    password: "123456123456",
                    role: "user",
                    old_email: "prueba@gmail.com"
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(201);
            expect(response.body).toStrictEqual({ "items_updated": 4 });
        });
    });

    describe("DELETE /api/user?email=prueba2@gmail.com", () => {
        it("should delete a user", async () => {
            const response = await request
                .delete("/api/user?email=prueba2@gmail.com")
                .expect(200);
            expect(response.body).toEqual(1);
        });
    });

});

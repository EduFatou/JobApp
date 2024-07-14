const supertest = require("supertest");
const server = require("../index");
const mongoose = require("../config/db_mongo");
const request = supertest(server);

afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
});

describe("Jobs Routes", () => {

    describe("POST /api/jobs", () => {
        it("should create a new job", async () => {
            const response = await request
                .post("/api/jobs")
                .send({
                    title: "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
                    description: "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
                    skills: ["Shopify", "Web Design", "Data Entry"],
                    client_location: "United States",
                    url: "www.google.com",
                    source: "scraping",
                    status: true
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(201);
            expect(response.body).toEqual(expect.any(Object))
        });
    });

    describe("GET /api/jobs", () => {
        it("should return all jobs", async () => {
            const response = await request.get("/api/jobs").expect(200);
            expect(response.body).toEqual(expect.any(Array));
        });
    });

    describe("PUT /api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages", () => {
        it("should update an existing job", async () => {
            const response = await request
                .put("/api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages")
                .send({
                    title: "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
                    description: "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
                    skills: ["Shopify", "Web Design", "Data Entry"],
                    client_location: "United States",
                    url: "www.google.com",
                    source: "scraping",
                    status: false
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(response.body).toHaveProperty("status", false);
        });
    });

    describe("DELETE /api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages", () => {
        it("should delete a job", async () => {
            const response = await request
                .delete("/api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages")
                .expect(200);
            expect(response.body).toEqual({
                "acknowledged": true,
                "deletedCount": 1
            });
        });
    });

});

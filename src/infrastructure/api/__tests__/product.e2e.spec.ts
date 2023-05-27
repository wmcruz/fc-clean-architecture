import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

      it("should create a product",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "A",
                name: "Lampada",
                price: 8.50
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Lampada");
        expect(response.body.price).toBe(8.50);
      });

      it("should create a product",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Lampada"
            });

        expect(response.status).toBe(500);
      });

      it("should list all products",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "A",
                name: "Lampada",
                price: 8.50
            });
        expect(response.status).toBe(200);
        
        const response2 = await request(app)
        .post("/product")
        .send({
            type: "B",
            name: "TV",
            price: 1000.00
        });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        
        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("Lampada");
        expect(product1.price).toBe(8.50);
        
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("TV");
        expect(product2.price).toBe(1000.00);

        const listResponseXML = await request(app)
            .get("/product")
            .set("Accept", "application/xml")
            .send();
        
        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<products>`);
        expect(listResponseXML.text).toContain(`<product>`);
        expect(listResponseXML.text).toContain(`<name>Lampada</name>`);
        expect(listResponseXML.text).toContain(`<price>8.5</price>`);
        expect(listResponseXML.text).toContain(`</product>`);
        expect(listResponseXML.text).toContain(`<name>TV</name>`);
        expect(listResponseXML.text).toContain(`<price>1000</price>`);
        expect(listResponseXML.text).toContain(`</products>`);
      });
});
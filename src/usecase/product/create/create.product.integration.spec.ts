import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product",async () => {
        // cenário
        const productRepository = new ProductRepository();
        const createProductUsecase = new CreateProductUseCase(productRepository);

        const productInput = {
            type: "a",
            name: "Lampada",
            price: 5.55
        };

        // ação
        const productOutput = await createProductUsecase.execute(productInput);

        // validação
        expect(productOutput).toEqual({
            id: expect.any(String),
            name: productInput.name,
            price: productInput.price
        });
    });
});
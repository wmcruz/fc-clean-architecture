import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
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

    it("should update a product",async () => {
        // cenário
        const productRepository = new ProductRepository();
        const createProductUsecase = new CreateProductUseCase(productRepository);
        const updateProductUsecase = new UpdateProductUseCase(productRepository);

        const input = {
            type: "a",
            name: "Lampada",
            price: 5.55
        };

        const productInput = await createProductUsecase.execute(input);
        
        const updateProductInput = {
            id: productInput.id,
            name: "Lampada LED",
            price: 12.30
        };
        
        // ação
        const productOutput = await updateProductUsecase.execute(updateProductInput);

        // validação
        expect(productOutput).toEqual({
            id: updateProductInput.id,
            name: updateProductInput.name,
            price: updateProductInput.price
        });
    });
});
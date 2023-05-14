import { Sequelize } from "sequelize-typescript";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Integration test find product use case", () => {
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

    it("should find a product",async () => {
        // cenário
        const productRepository = new ProductRepository();
        const findProductUsecase = new FindProductUseCase(productRepository);

        const productInput = new Product("a", "Lampada", 12.50);
        await productRepository.create(productInput);

        const input = {
            id: productInput.id
        };

        // ação
        const productOutput = await findProductUsecase.execute(input);

        // validação
        expect(productOutput).toEqual({
            id: productInput.id,
            name: productInput.name,
            price: productInput.price
        });
    });
});
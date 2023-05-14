import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "../list/list.product.usecase";

describe("Integration test list product use case", () => {
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

    it("should list a product",async () => {
        // cenário
        const productRepository = new ProductRepository();
        const createProductUsecase = new CreateProductUseCase(productRepository);
        const listProductUsecase = new ListProductUseCase(productRepository);

        const input1 = {
            type: "a",
            name: "Lampada Incandecente",
            price: 5.55
        };

        const input2 = {
            type: "a",
            name: "Lampada LED",
            price: 8.90
        };

        const productInput1 = await createProductUsecase.execute(input1);
        const productInput2 = await createProductUsecase.execute(input2);
        
        // ação
        const productOutput = await listProductUsecase.execute({});

        // validação
        expect(productOutput.products.length).toBe(2);
        expect(productOutput.products[0].id).toBe(productInput1.id);
        expect(productOutput.products[0].name).toBe(productInput1.name);
        expect(productOutput.products[0].price).toBe(productInput1.price);

        expect(productOutput.products[1].id).toBe(productInput2.id);
        expect(productOutput.products[1].name).toBe(productInput2.name);
        expect(productOutput.products[1].price).toBe(productInput2.price);
    });
});
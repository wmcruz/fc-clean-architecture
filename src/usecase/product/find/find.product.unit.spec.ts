import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Lampada", 12.50);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find product use case", () => {

    it("should find a product",async () => {
        // cenário
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        }

        const output = {
            id: expect.any(String),
            name: "Lampada",
            price: 12.50
        }

        // ação
        const result = await usecase.execute(input);

        // validação
        expect(result).toEqual(output);
    })

    it("should not find a product",async () => {
        // cenário
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        }

        // ação e validação
        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    })
});
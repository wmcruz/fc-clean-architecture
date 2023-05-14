import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Lampada",
    price: 12.50
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("Unit test create product use case", () => {

    it("should create a product",async () => {
        // cenário
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        // ação
        const output = await usecase.execute(input);

        // validação
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should thrown an error when name product is missing",async () => {
        // cenário
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        
        input.name = "";

        // ação e validação
        await expect(usecase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when price product is must be grater than zero",async () => {
        // cenário
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        
        input.name = "Lampada";
        input.price = -1;

        // ação e validação
        await expect(usecase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});
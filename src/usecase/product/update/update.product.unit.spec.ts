import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const productInput = ProductFactory.create("a", "Lampada", 12.50);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(productInput)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    // cenário
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    // ação
    const productOutput = await usecase.execute(productInput);

    // validação
    expect(productOutput).toEqual({
        id: productInput.id,
        name: productInput.name,
        price: productInput.price
    });
  });
});
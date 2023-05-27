import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductPresenter from "../presenters/product.presenter";


export const productRoute = express.Router();

productRoute.post("/",async (req: Request, res: Response) => {
    const usecaseCreateProduct = new CreateProductUseCase(new ProductRepository);

    try {
        const productDTO = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        };

        const output = await usecaseCreateProduct.execute(productDTO);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }

});

productRoute.get("/",async (req: Request, res: Response) => {
    const usecaseListProduct = new ListProductUseCase(new ProductRepository);
    const output = await usecaseListProduct.execute({});
    
    res.format({
        json:async () =>  res.send(output),
        xml:async () => res.send(ProductPresenter.listXML(output)),
    });
});
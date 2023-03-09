import express, { Express, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { CreateProductUseCase, FindAllProductsUseCase } from '~/application/usecases/products';
import { Product } from '~/domain/entities';
// import { ProductInMemoryRepository } from '~/infra/database/repositories/in-memoy';
import { ProductSchema } from '~/infra/database/repositories/typeorm/product';

const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 3332;
// const repository = new ProductInMemoryRepository();

let repository;

(async () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [ProductSchema]
  });
  await dataSource.initialize();
  const repository = dataSource.getRepository(Product);
  return repository;
})()
.then(productRepository => repository = productRepository);

app.post('/products', async (req: Request, res: Response) => {
  const { product } = req.body;
  if(!product) {
    res.status(200).json();
    return;
  }
  const createProductUseCase = new CreateProductUseCase(repository);
  const output = await createProductUseCase.execute(product);
  res.status(201).json(output);
});

app.get('/products', async (req: Request, res: Response) => {
  const { price } = req.query;
  const opts: any = {};
  const hasPrice = !!price;
  if(hasPrice) {
    const [minValue, maxValue] = String(price).split(',');
    opts.priceRange = {
      maxValue,
      minValue
    }
  }
  const findAllProductsUseCase = new FindAllProductsUseCase(repository);
  const output = await findAllProductsUseCase.execute(opts);
  res.status(201).json(output);
});

app.listen(port, () => {
  console.log(`server runnning on ${port}`)
});

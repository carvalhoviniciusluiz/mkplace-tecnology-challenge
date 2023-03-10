import express, { Express, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { CreateProductUseCase, FindAllProductsUseCase, FindOneProductByBrandUseCase, FindOneProductByNameUseCase, FindOneProductBySlugUseCase } from '~/application/usecases/products';
import { Product } from '~/domain/entities';
import type { FindAllProductsUseCaseInputInterface } from '~/domain/usecases/products/inputs';
import { ProductTypeOrmRepository } from '~/infra/database/repositories/typeorm';
import { makeDataSource } from '~/main/database/repositories/typeorm';

const port = process.env.PORT || 3332;
const app: Express = express();

let repository: ProductTypeOrmRepository;

app.use(express.json());

app.post('/products', async (req: Request, res: Response) => {
  const { product } = req.body;
  if(!product) {
    res.status(200).json();
    return;
  }
  const createProductUseCase = new CreateProductUseCase(
    new FindOneProductByBrandUseCase(repository),
    new FindOneProductByNameUseCase(repository),
    repository
  );
  const output = await createProductUseCase.execute(product).catch(error => {
    res.status(201).json(error.message);
    return;
  });
  res.status(201).json(output);
});

app.get('/products', async (req: Request, res: Response) => {
  const { price, slug } = req.query;
  const hasPrice = !!price;
  const hasSlug = !!slug;
  if(hasPrice) {
    const opts: FindAllProductsUseCaseInputInterface = {};
    const [minValue, maxValue] = String(price).split(',');
    opts.priceRange = {
      maxValue: Number(maxValue),
      minValue: Number(minValue)
    }
    const findAllProductsUseCase = new FindAllProductsUseCase(repository);
    const output = await findAllProductsUseCase.execute(opts);
    res.status(201).json(output);
    return;
  }
  if(hasSlug) {
    const findOneProductBySlugUseCase = new FindOneProductBySlugUseCase(repository);
    const output = await findOneProductBySlugUseCase.execute(String(slug));
    res.status(201).json(output);
    return;
  }
  res.status(201).json();
});

makeDataSource('postgres')
  .then((dataSource: DataSource) => {
    repository = new ProductTypeOrmRepository(dataSource.getRepository(Product));
  });

app.listen(port, () => {
  console.log(`server runnning on ${port}`)
});

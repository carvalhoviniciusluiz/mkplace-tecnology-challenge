import express, { Express, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { CreateSellerUseCase } from '~/application/usecases/sellers';
import { Seller } from '~/domain/entities';
import { SellerSchema } from '~/infra/database/repositories/typeorm/seller';
// import { SellerInMemoryRepository } from '~/infra/database/repositories/in-memoy';

const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 3331;
// const repository = new SellerInMemoryRepository();

let repository;

(async () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [SellerSchema]
  });
  await dataSource.initialize();
  const repository = dataSource.getRepository(Seller);
  return repository;
})()
.then(sellerRepository => repository = sellerRepository);

app.post('/sellers', async (req: Request, res: Response) => {
  const { seller } = req.body;
  if(!seller) {
    res.status(200).json();
    return;
  }
  const createSellerUseCase = new CreateSellerUseCase(repository);
  const output = await createSellerUseCase.execute(seller);
  res.status(201).json(output);
})

app.listen(port, () => {
  console.log(`server runnning on ${port}`)
});

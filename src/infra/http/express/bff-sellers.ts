import express, { Express, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { CreateSellerUseCase } from '~/application/usecases/sellers';
import { Seller } from '~/domain/entities';
import { SellerTypeOrmRepository } from '~/infra/database/repositories/typeorm';
import { makeDataSource } from '~/main/database/repositories/typeorm';

const port = process.env.PORT || 3331;
const app: Express = express();

let repository: SellerTypeOrmRepository;

app.use(express.json());

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

makeDataSource('postgres')
  .then((dataSource: DataSource) => {
    repository = new SellerTypeOrmRepository(dataSource.getRepository(Seller));
  });

app.listen(port, () => {
  console.log(`server runnning on ${port}`)
});

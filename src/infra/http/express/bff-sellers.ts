import express, { Express, Request, Response } from 'express';
import { CreateSellerUseCase } from '~/application/usecases/sellers';
import { SellerInMemoryRepository } from '~/infra/database/repositories/in-memoy';

const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 3331;
const repository = new SellerInMemoryRepository();

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

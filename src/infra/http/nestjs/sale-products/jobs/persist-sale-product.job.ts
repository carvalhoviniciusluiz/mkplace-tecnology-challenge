import { EntityManager } from "@mikro-orm/mongodb";
import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { CreateSaleProductUseCaseInterface } from "~/domain/usecases/sale-products";
import { CreateSaleProductUseCaseInputInterface } from "~/domain/usecases/sale-products/inputs";

@Processor('sale-products-service')
export class PersistSaleProductJob {
  constructor(
    @Inject('CreateSaleProduct_LOG_UseCase')
    private readonly createSaleProductUseCase: CreateSaleProductUseCaseInterface
  ) {}

  @Process('sale-product.created')
  async handle(job: Job<{ input: CreateSaleProductUseCaseInputInterface }>) {
    console.log('job processing......');
    const { input } = job.data;
    await this.createSaleProductUseCase.execute(input);
  }

  @OnQueueFailed({ name: 'sale-product.created' })
  handleError(error: Error) {
    console.log('PersistSaleProductJob', error)
  }
}

import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateSaleProductUseCaseInputInterface } from "~/domain/usecases/sale-products/inputs";

@Processor('sale-products-service')
export class PersistSaleProductJob {
  @Process('sale-product.created')
  async handle(job: Job<{ account: CreateSaleProductUseCaseInputInterface }>) {
    console.log('job processing......');
    console.log(job.data);
  }

  @OnQueueFailed({ name: 'sale-product.created' })
  handleError(error: Error) {
    console.log('SendAccountConfirmationEmailJob', error)
  }
}

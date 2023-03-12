import { CreateSaleProductUseCaseInputInterface } from "~/domain/usecases/sale-products/inputs";

export class SaleProductCreatedEvent {
  constructor(public readonly input: CreateSaleProductUseCaseInputInterface) {}
}

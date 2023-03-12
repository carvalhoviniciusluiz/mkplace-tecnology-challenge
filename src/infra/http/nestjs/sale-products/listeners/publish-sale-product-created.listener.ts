import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Queue } from "bull";
import { SaleProductCreatedEvent } from "../events/sale-product-created.event";

@Injectable()
export class PublishSaleProductCreatedListener {
  constructor(
    @InjectQueue('sale-products-service')
    private queue: Queue
  ) {}

  @OnEvent('sale-product.created')
  async handle(event: SaleProductCreatedEvent) {
    await this.queue.add('sale-product.created', event);
  }
}

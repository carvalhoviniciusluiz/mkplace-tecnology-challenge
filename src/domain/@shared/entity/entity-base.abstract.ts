import crypto from 'crypto';
import { Notification } from "../notification";

export abstract class EntityBase {
  protected notification: Notification;

  constructor(readonly id = crypto.randomUUID()) {
    this.notification = new Notification();
  }
}

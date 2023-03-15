import type { NotificationErrorInterface } from "../protocols/notification-error";

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorInterface[]) {
    const message = errors.map(error => `${error.context} ${error.message}`).join(",");
    super(message);
  }
}

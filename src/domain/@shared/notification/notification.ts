import type { NotificationErrorInterface } from "../protocols/notification-error";

export class Notification {
  private errorsBag: NotificationErrorInterface[] = [];

  addError(error: NotificationErrorInterface): void {
    this.errorsBag.push(error);
  }

  hasError(): boolean {
    return this.errorsBag.length > 0;
  }

  errors(): NotificationErrorInterface[] {
    return this.errorsBag;
  }

  messages(context?: string): string {
    const hasContext = !!context;
    const message = this.errorsBag
      .filter(error => !hasContext || error.context === context)
      .map(error => `${error.context}: ${error.message}`)
      .join(",");
    return message + ",";
  }
}

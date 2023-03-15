import { Notification } from "./notification";

describe("Notification test", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "product"
    };
    notification.addError(error);
    expect(notification.messages("product")).toBe("product: error message,");
    const error2 = {
      message: "error message2",
      context: "product"
    };
    notification.addError(error2);
    expect(notification.messages("product")).toBe("product: error message,product: error message2,");
    const error3 = {
      message: "error message",
      context: "seller"
    };
    notification.addError(error3);
    expect(notification.messages("product")).toBe("product: error message,product: error message2,");
    expect(notification.messages()).toBe("product: error message,product: error message2,seller: error message,");
  });
  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "product"
    };
    notification.addError(error);
    expect(notification.hasError()).toBe(true);
  });
  it("should return all errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "product"
    };
    notification.addError(error);
    expect(notification.errors()).toEqual([error]);
  });
});

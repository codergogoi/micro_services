import { Publisher, Subjects, OrderCancelledEvent } from 'codergogoi-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

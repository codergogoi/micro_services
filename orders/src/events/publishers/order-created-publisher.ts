import { Publisher, OrderCreatedEvent, Subjects } from 'codergogoi-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

import { Publisher, Subjects, PaymentCreatedEvent } from 'codergogoi-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

import { Publisher, TicketCreatedEvent, Subjects } from 'codergogoi-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

import { Publisher, TicketUpdatedEvent, Subjects } from 'codergogoi-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

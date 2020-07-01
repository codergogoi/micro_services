import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from 'codergogoi-common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

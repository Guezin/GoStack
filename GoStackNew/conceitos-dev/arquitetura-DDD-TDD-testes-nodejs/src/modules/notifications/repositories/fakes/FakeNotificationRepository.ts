import { ObjectID } from 'mongodb';

import Notification from '../../infra/typeorm/schemas/Notification';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class FakeNotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationRepository;

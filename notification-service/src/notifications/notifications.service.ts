
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifications, NotificationsDocument } from './notifications.model';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private notificationsModel: Model<NotificationsDocument>,
    private notificationsGateway: NotificationsGateway // Inject the gateway
  ) {}

  async createNotification(data: Notifications){
    const notification = new this.notificationsModel(data);
    return await notification.save();
  }

  async createUserLoggedInNotification(Name: string): Promise<Notifications> {
      const notification = {
        Name:Name,
        Type: 'user_logged_in',
        ShowName: '', // Provide an initializer for ShowName
        Message: `User ${Name} has logged in.`,
        Timestamp: new Date(),
      };
      const createdNotification = await this.createNotification(notification);
      this.notificationsGateway.sendNotification(createdNotification); // Send real-time notification
      return createdNotification;
  }
  
  async createNewMovieAddedNotification(ShowName: string): Promise<Notifications> {
    const notification: Notifications = {
      Name: '',
      Type: 'new_movie_added',
      ShowName,
      Message: `A new movie  ${ShowName} has been added.`,
      Timestamp: new Date(),
     
    };
    const createdNotification = await this.createNotification(notification);
    this.notificationsGateway.sendNotification(createdNotification); // Send real-time notification
    return createdNotification;
  }

  async getAllNotifications() {
    return this.notificationsModel.find().sort({ Timestamp: -1 }).exec(); // Sort by Timestamp in descending order
  }

 
 
}

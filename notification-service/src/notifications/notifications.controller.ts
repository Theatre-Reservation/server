import { Controller , Post, Body,Get} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
     constructor(private readonly notificationsService: NotificationsService ) {}

    // Consumes the 'user_logged_in' event from RabbitMQ
  @EventPattern('user_logged_in')
  async createUserLoggedInNotification(data: { Name: string }) {
    const { Name } = data;
    return this.notificationsService.createUserLoggedInNotification(Name);
  }
    // Consumes the 'new_movie_added' event from RabbitMQ
  @EventPattern('new_movie_added')
  async createNewMovieAddedNotification(ShowName: string) {
    return this.notificationsService.createNewMovieAddedNotification(ShowName);
  }
    //end point to get all the notifications
    @Get()
    async getAllNotifications() {
      return this.notificationsService.getAllNotifications();
    }








}

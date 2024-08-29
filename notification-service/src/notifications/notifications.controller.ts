import { Controller , Post, Body,Get} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
     constructor(private readonly notificationsService: NotificationsService ) {}

     //Endpoint to get user logged in notification
     @Post('user-logged-in')
     async createUserLoggedInNotification(@Body('Name') Name: string) {
        return this.notificationsService.createUserLoggedInNotification(Name);
      } 


     // Endpoint to create a new movie added notification
    @Post('new-movie-added')
    async createNewMovieAddedNotification(@Body('ShowName') ShowName: string){
        return this.notificationsService.createNewMovieAddedNotification(ShowName);
    } 
    

    //end point to get all the notifications
    @Get()
    async getAllNotifications() {
      return this.notificationsService.getAllNotifications();
    }








}

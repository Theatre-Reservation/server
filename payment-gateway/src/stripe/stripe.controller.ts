import { Controller, Post, Body, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, 'lkr'); // Use your desired currency
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }


  @Post('create-checkout-session')
  async createCheckoutSession(
        @Body() body: { amount: number, currency: string, description: string },
        @Headers('host') host: string) {
    try {
        const { amount, currency, description } = body;

        const returnAddress = `${req.protocol}://${req.get('host')}/payment-success`;
        
        const formatedAmount=amount*100
        const session = await this.stripeService.createCheckoutSession(formatedAmount, currency, description,returnAddress);
        console.log(session.id)
        const sessionId =session.id
        return {
            "session":sessionId
        };
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return error
    }
  }
}

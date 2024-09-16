import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('sk_test_51PsTIg2LvxXMvsXISvj4KKR6LzX6FIIDeg8egfufrys9I1vnSmmfz3Ubf1FEnTgwQFatgOZ1wHGrK8D1r2DxXb0b00h38K8lql', {
      apiVersion: '2024-06-20',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async createCheckoutSession(amount: number, currency: string, description: string,returnAddress:string): Promise<Stripe.Checkout.Session> {
    const session = await this.stripe.checkout.sessions.create({
      
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: description,
            },
            unit_amount: amount, // Amount in the smallest currency unit (e.g., cents for USD)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: "http://localhost:5173/payment", // Replace with your success URL
      cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL
    });
    console.log("this is return address"+returnAddress);

    return session;
  }

  async retrieveSession(sessionId: string|undefined): Promise<Stripe.Checkout.Session | null> {
    console.log("this is the id: "+sessionId)
    try {
      
      return await this.stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      console.log("error");
      return null;
    }
  }

}

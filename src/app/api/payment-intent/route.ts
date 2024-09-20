// app/api/create-payment-intent/route.ts
import env from "@/lib/env";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    // Parse the request body to get payment amount or other data
    const { amount } = await req.json();

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in the smallest currency unit (e.g., cents)
      currency: "usd", // Use your preferred currency
    });

    // Return the clientSecret to the client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create payment intent" }),
      {
        status: 500,
      }
    );
  }
}

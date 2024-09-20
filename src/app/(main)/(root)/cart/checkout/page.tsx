"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { billingDetailsFormSchema } from "@/lib/types";
import { CustomForm, CustomFormField, FormColumn, FormRow } from "@/components";
import env from "@/lib/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ cartTotal, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (formData) => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phoneNumber,
        address: {
          line1: formData.shippingAddress.streetAddress,
          city: formData.shippingAddress.city,
          state: formData.shippingAddress.state,
          postal_code: formData.shippingAddress.zipCode,
        },
      },
    });

    if (error) {
      setPaymentError(error.message);
      setIsProcessing(false);
    } else {
      // Here you would typically send the paymentMethod.id to your server
      // to create a charge or save the payment method for later use
      console.log("PaymentMethod:", paymentMethod);
      onPaymentSuccess(paymentMethod);
      setIsProcessing(false);
    }
  };

  return (
    <CustomForm
      defaultValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        shippingAddress: {
          streetAddress: "",
          city: "",
          state: "",
          zipCode: "",
        },
        billingAddress: {
          streetAddress: "",
          city: "",
          state: "",
          zipCode: "",
        },
      }}
      schema={billingDetailsFormSchema}
      action={handleSubmit}
      submitLabel="Place Order"
    >
      <FormColumn>
        <FormRow>
          <CustomFormField label="First Name" name="firstName" />
          <CustomFormField label="Last Name" name="lastName" />
        </FormRow>
        <FormRow>
          <CustomFormField label="Email" name="email" />
          <CustomFormField label="Phone Number" name="phoneNumber" />
        </FormRow>
      </FormColumn>

      <FormColumn>
        <FormRow>
          <CustomFormField
            label="Street Address"
            name="shippingAddress.streetAddress"
          />
          <CustomFormField label="City" name="shippingAddress.city" />
        </FormRow>
        <FormRow>
          <CustomFormField label="State" name="shippingAddress.state" />
          <CustomFormField label="ZIP Code" name="shippingAddress.zipCode" />
        </FormRow>
      </FormColumn>

      <FormColumn>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {paymentError && (
          <div className="text-red-500 text-sm mb-4">{paymentError}</div>
        )}
        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing ? "Processing..." : `Pay ${formatPrice(cartTotal)}`}
        </Button>
      </FormColumn>
    </CustomForm>
  );
}

export default function CheckoutPage({ cartProducts }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cartTotal = cartProducts.reduce(
    (total, product) =>
      total +
      (product.finalPriceInCents ?? product.priceInCents) * product.quantity,
    0
  );

  const handlePaymentSuccess = (paymentMethod) => {
    // Here you would typically handle the successful payment
    // For example, clearing the cart, showing a success message, etc.
    setPaymentSuccess(true);
    console.log("Payment successful:", paymentMethod);
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        {paymentSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Thank you for your order!
            </h2>
            <p>
              Your payment was successful and your order is being processed.
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <CheckoutForm
                cartTotal={cartTotal}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
            <div className="lg:w-1/3">
              <Card>
                <CardHeader className="text-xl font-semibold">
                  Order Summary
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 max-h-64 overflow-auto">
                    {cartProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {product.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          {formatPrice(
                            (product.finalPriceInCents ??
                              product.priceInCents) * product.quantity
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Elements>
  );
}

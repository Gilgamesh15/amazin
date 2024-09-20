"use client";
import React from "react";
import { CustomForm, CustomFormField, FormColumn, FormRow } from "@/components";
import { billingDetailsFormSchema } from "@/lib/types";

// Zod Schema for Checkout Form

// Default Values for Checkout Form
const defaultValues = {
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
  paymentInfo: {
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  },
};

export default function CheckoutForm() {
  return (
    <CustomForm
      defaultValues={defaultValues}
      schema={billingDetailsFormSchema}
      action={async () => {}}
      submitLabel="Proceed to Payment"
    >
      {/* Personal Info Column */}
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

      {/* Shipping & Billing Address Column */}
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
        <FormRow>
          <CustomFormField
            label="Billing Address"
            name="billingAddress.streetAddress"
            optional
          />
        </FormRow>
      </FormColumn>

      {/* Payment Info Column */}
      <FormColumn>
        <FormRow>
          <CustomFormField label="Card Number" name="paymentInfo.cardNumber" />
          <CustomFormField
            label="Expiration Date"
            name="paymentInfo.expirationDate"
          />
        </FormRow>
        <FormRow>
          <CustomFormField label="CVV" name="paymentInfo.cvv" />
        </FormRow>
      </FormColumn>
    </CustomForm>
  );
}

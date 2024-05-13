"use client";
import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

import React from "react";

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <USCProvider
      cartMode="client-only"
      mode="payment"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="http://localhost:3000/paystack/success"
      cancelUrl="http://localhost:3000/error"
      currency="NGN"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
};

export default CartProvider;

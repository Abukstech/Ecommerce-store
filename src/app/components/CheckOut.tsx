"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useShoppingCart } from "use-shopping-cart";

const CheckOut = ({ isOpen, isClose }: any) => {
  const { cartDetails, totalPrice } = useShoppingCart();

  const router = useRouter();

  const publicKey = process.env.NEXT_PUBLIC_STRIPE_KEY as string;
  const amount = (totalPrice! * 100) as number;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const config: PaystackProps = {
    email: email,
    amount: amount,
    publicKey,
    firstname: fullName,
  };

  const initializePayment: any = usePaystackPayment(config);

  const onSuccess: any = () => {
    alert("success");
    router.push("/paystack/success");
  };

  const onClose: any = () => {
    alert("Payment cancelled.");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    initializePayment(onClose, onSuccess);
    isClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          type="button"
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={() => {
            isClose();
          }}
        >
          <X />
        </button>

        <div className="my-5 text-center text-primary text-base font-semibold">
          Enter Your Shipping Details To Process Your Order
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fname">Full Name</label>
              <div className="bg-transparent">
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="John M. Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-primary border-2 px-2 w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email">
                <i className="fa fa-envelope" /> Email
              </label>
              <div className="bg-transparent">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary border-2 px-2 w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="adr">
                <i className="fa fa-address-card-o" /> Address
              </label>
              <div className="bg-transparent">
                <input
                  type="text"
                  id="adr"
                  name="address"
                  placeholder="542 W. 15th Street"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-primary border-2 px-2 w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="city">City</label>
              <div className="bg-transparent">
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border-primary border-2 px-2 w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="state">State</label>
              <div className="bg-transparent">
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="NY"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border-primary border-2 px-2 w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="zip">Zip</label>
              <div className="bg-transparent">
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="10001"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="border-primary border-2 px-2 w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="zip">Phone Number</label>
              <div className="bg-transparent">
                <input
                  type="text"
                  id="zip"
                  name="phone"
                  placeholder=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-primary border-2 px-2 w-full"
                />
              </div>
            </div>
          </div>

          <label className="block mt-4">
            <input type="checkbox" defaultChecked name="sameadr" /> Shipping
            address same as billing
          </label>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="btn bg-primary text-white px-4 py-2 rounded"
            >
              Pay with Paystack
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;

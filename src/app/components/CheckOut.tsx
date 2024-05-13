import React, { useState } from "react";

import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useShoppingCart } from "use-shopping-cart";

const CheckOut = () => {
  const { cartDetails, totalPrice } = useShoppingCart();

  const publicKey = process.env.NEXT_PUBLIC_STRIPE_KEY as string;
  const amount = totalPrice as number;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const config: PaystackProps = {
    email: email,
    amount: amount,
    publicKey,
  };

  const initializePayment: any = usePaystackPayment(config);

  const onSuccess: any = () => {
    alert("success");
  };

  const onClose: any = () => {
    alert("Payment cancelled.");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    initializePayment(onClose, onSuccess);
  };

  return (
    <div>
      <center>
        <h1 className="checkout-text">Checkout</h1>
      </center>

      <div className="row">
        <div className="col-50">
          <div className="billing-info">
            <form>
              <div className="row">
                <div className="col-50">
                  <h3 className="checkout-text">Billing Address</h3>
                  <label htmlFor="fname">
                    <i className="fa fa-user" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <p>{fullName}</p>
                  <label htmlFor="email">
                    <i className="fa fa-envelope" /> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p>{email}</p>
                  <label htmlFor="adr">
                    <i className="fa fa-address-card-o" /> Address
                  </label>
                  <input
                    type="text"
                    id="adr"
                    name="address"
                    placeholder="542 W. 15th Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label htmlFor="city">
                    <i className="fa fa-institution" /> City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="NY"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="10001"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <label>
                <input type="checkbox" name="sameadr" /> Shipping address same
                as billing
              </label>
              <center>
                <button onClick={handleSubmit} className="btn">
                  Pay with Paystack
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

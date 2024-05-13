"use client";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/SheetComponent";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { redirect } from "next/navigation";

const ShoppingCartModal = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,

    redirectToCheckout,
  } = useShoppingCart();

  const publicKey = process.env.NEXT_PUBLIC_STRIPE_KEY as string;
  const amount = totalPrice as number;

  const config: PaystackProps = {
    amount: amount,
    publicKey,
    email: "abukstech@gmail.com",
  };

  const initializePayment: any = usePaystackPayment(config);

  const onSuccess: any = () => {
    alert("success");
    redirectToCheckout();
  };

  const onClose: any = () => {
    alert("Payment cancelled.");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    initializePayment(onClose, onSuccess);
  };

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw] bg-white">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200 ">
              {cartCount === 0 ? (
                <h1 className="py-6 text-black">No items </h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6 ">
                      <div className="overflow-hidden rounded-md border border-gray-400 h-24 w-24 flex-shrink-0">
                        <Image
                          src={entry.image as any}
                          alt="Product Checkout"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-6">
                              {" "}
                              <span>&#8358;</span>
                              {entry.price}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 justify-between items-end text-sm mt-3">
                          <p className="text-gray-500">QTY: {entry.quantity}</p>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primary/80"
                              onClick={() => removeItem(entry.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-500 px-4 py-6 sm:px-6">
            <div className="flex justify-between font-medium text-base text-gray-900">
              <p>SubTotal:</p>
              <p>
                {" "}
                <span>&#8358;</span>
                {totalPrice}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and Taxes are Calculated at Checkout
            </p>

            <div className="mt-6">
              <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Checkout
              </button>
            </div>

            <div className="flex mt-6 justify-center text-center text-sm text-gray-500">
              <div>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;

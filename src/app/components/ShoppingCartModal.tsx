"use client";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/SheetComponent";
import Image from "next/image";

const ShoppingCartModal = () => {
  const { cartCount, shouldDisplayCart, handleCartClick, cartDetails } =
    useShoppingCart();
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
                          src={entry.image as string}
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

                        <div className="flex flex-1 justify-between items-end text-sm">
                          <p className="text-gray-500">QTY: {entry.quantity}</p>
                          <div className="flex">
                            <button></button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;

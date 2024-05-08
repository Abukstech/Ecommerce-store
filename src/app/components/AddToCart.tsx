"use client";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

interface ShoppingCart {
  name: string;
  price: number;
  description: string;
  currency: string;
  image: any;
}

const AddToCart = ({
  name,
  price,
  description,
  currency,
  image,
}: ShoppingCart) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name,
    price,
    description,
    currency,
    images: urlFor(image).url(),
    id: "ladgshl",
  };
  return (
    <button
      className="btn btn-primary rounded-md  "
      onClick={() => {
        addItem(product), handleCartClick();
      }}
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
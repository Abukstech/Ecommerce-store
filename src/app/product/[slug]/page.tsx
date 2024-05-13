import AddToCart from "@/app/components/AddToCart";
import ImageGallery from "@/app/components/ImageGallery";
import { client } from "@/app/lib/sanity";
import { Star, Truck } from "lucide-react";
import React from "react";

interface Props {
  _id: string;
  images: string[];
  price: number;
  name: string;
  categoryName: string;
  slug: string;
  description: string;
}

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
    }`;
  const data = await client.fetch(query);

  return data;
}

const Productpage = async ({ params }: { params: { slug: string } }) => {
  const data: Props = await getData(params.slug);

  const discounted = 0.1 * data.price;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-400">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-500">{data.name}</h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-16">
              <button className="btn btn-primary rounded-md text-gray-800">
                <span className="text-sm">4.2</span>
                <Star className="h-6 w-5" />
              </button>
              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  <span>&#8358;</span>
                  {data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  <span>&#8358;</span>
                  {data.price + discounted}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Inc. Vat Plus Shipping
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span>2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5 ">
              <AddToCart
                name={data.name}
                currency="NGN"
                description={data.description}
                image={data.images[0]}
                price={data.price}
                key={data._id}
                id={data._id}
              />
              <button className="btn btn-secondary rounded-md ">
                Checkout Now
              </button>
            </div>
            <p className="mt-14 text-base text-gray-500  tracking-wider">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;

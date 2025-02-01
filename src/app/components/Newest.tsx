import React from "react";
import { client } from "../lib/sanity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface Props {
  _id: string;
  imageUrl: string;
  price: number;
  name: string;
  categoryName: string;
  slug: string;
}

async function getData() {
  const query = `*[_type == 'product'][1...5] | order(_createdAt desc ){
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
    
}`;

  const data = await client.fetch(query);

  return data;
}

const Newest = async () => {
  const data: Props[] = await getData();

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tighter text-primary">
            Our Newest Products
          </h2>

          <Link href="/all" className="text-primary flex items-center gap-x-1">
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm justify-between">{product.name}</h3>
                    <p className="font-semibold mt-1 text-gray-500">
                      {product.categoryName}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    <span>&#8358;</span>
                    {product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newest;

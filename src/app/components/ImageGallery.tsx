"use client";
import React, { useState } from "react";
import { urlFor } from "../lib/sanity";
import Image from "next/image";

interface Props {
  images: string[];
}

const ImageGallery = ({ images }: Props) => {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleImageChange = (image: any) => {
    setBigImage(image);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col ">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              alt=""
              width={200}
              height={200}
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleImageChange(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-400 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt=""
          width={500}
          height={500}
          className="h-full w-full object-cover object-center "
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          SALE
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;

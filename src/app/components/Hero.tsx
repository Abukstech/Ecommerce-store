import Image from "next/image";
import React from "react";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroimage'][0]";

  const data = await client.fetch(query);

  return data;
}

const Hero = async () => {
  const data = await getData();
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16 ">
        <div className="mb-6 flex  w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-28">
          <h1 className="mb-4 text-4xl font-bold  sm:text-5xl md:mb-8 md:text-6xl">
            Elevate Your Fashion Sense!
          </h1>
          <p className="max-w-md leading-relaxed xl:text-lg text-gray-500">
            We sell high quality products for to make you standout as a
            fashionista Come shop with us!
          </p>
        </div>
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3 mt-4 ">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-10 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()}
              alt=""
              className="h-full w-full object-cover object-center"
              width={500}
              priority
              height={500}
            />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg ">
            <Image
              src={urlFor(data.image2).url()}
              alt=""
              className="h-full w-full object-cover object-center"
              width={500}
              priority
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 divide-x overflow-hidden rounded-lg border" >
          <Link
            href="/Clothing"
            className="flex sm:w-40 w-24  text-secondary items-center justify-center  transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Clothing
          </Link>
          <Link
            href="/Footwears"
            className="flex sm:w-40 w-24  items-center justify-center text-secondary  transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Footwears
          </Link>

          <Link
            href="/Jewelries"
            className="flex sm:w-40 w-24 items-center justify-center text-secondary  transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Jewelries
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

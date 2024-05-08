import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "nyxcw174",
  apiVersion: "2022-03-25",
  dataset: "production",
  useCdn: false,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

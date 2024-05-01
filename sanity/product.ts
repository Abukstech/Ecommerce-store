export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name of Product",
    },

    {
      name: "images",
      type: "array",
      title: "Images of Product",
      of: [{ type: "image" }],
    },
    {
      name: "description",
      type: "text",
      title: "Description of Product",
    },

    {
      name: "slug",
      type: "slug",
      title: "Product slug",
      options: {
        source: "name",
      },
    },

    {
      name: "price",
      type: "number",
      title: "Price of Product",
    },

    {
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
};

const products = [
  {
    CC_CODE: "093",
    CC_NAME: "Schengen Medical",
  },
  {
    CC_CODE: "093-1",
    CC_NAME: "Budget",
  },

  {
    CC_CODE: "093-3",
    CC_NAME: "Global Basic",
  },
  {
    CC_CODE: "093-4",
    CC_NAME: "Global Plus",
  },
  {
    CC_CODE: "093-5",
    CC_NAME: "Global Extra",
  },
];

export const ProductOptions = products.map((product) => {
  return {
    label: product.CC_NAME,
    value: product.CC_CODE,
  };
});

export type PrivateProduct = {
  id: string;
  name: string;
  color: string;
  size: string;
  sizes: string[];
  soldOutSizes?: string[];
  description: string;
  originalPrice: number;
  price: number;
  image: string;
  placeholderColor?: string;
  note: string;
};

export const privateProducts: PrivateProduct[] = [
  {
    id: "founders-tee",
    name: "Founders Tee",
    color: "Olive",
    size: "M",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Playera oversized en algodón pesado, tono olivo. Pieza de edición limitada de la Founders Collection.",
    originalPrice: 68,
    price: 44,
    image: "/images/tee-olivo-front.webp",
    note: "Limited to 50 pieces",
  },
  {
    id: "archive-hoodie",
    name: "Archive Hoodie",
    color: "Black",
    size: "L",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Hoodie de archivo en algodón pesado negro. Pieza de edición limitada de la Founders Collection.",
    originalPrice: 148,
    price: 98,
    placeholderColor: "#1E1B18",
    image: "",
    note: "Limited to 30 pieces",
  },
  {
    id: "sample-cap",
    name: "Sample Cap",
    color: "Sand",
    size: "One Size",
    sizes: ["One Size"],
    description:
      "Gorra de muestra en tono arena. Pieza de edición limitada de la Founders Collection.",
    originalPrice: 58,
    price: 35,
    placeholderColor: "#D8CBAE",
    image: "",
    note: "Limited to 20 pieces",
  },
];

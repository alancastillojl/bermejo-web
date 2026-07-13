export type Product = {
  id: string;
  name: string;
  color: string;
  size: string;
  sizes: string[];
  soldOutSizes?: string[];
  description: string;
  price: number;
  image: string;
  // Segunda foto opcional (ej. reverso de la prenda), se muestra al hacer hover.
  hoverImage?: string;
  // Cuando no hay foto de producto final, se usa un bloque de color como placeholder.
  placeholderColor?: string;
};

export const featuredDrop: Product[] = [
  {
    id: "b-essentials",
    name: "B-Essentials Tee",
    color: "Black",
    size: "M",
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    soldOutSizes: ["XXS"],
    description:
      "Playera oversized en algodón pesado con bordado \"Bermejo\" al pecho y monograma en la espalda. Fit relajado, cuello redondo.",
    price: 68,
    image: "/images/b-essentials-front.jpg",
    hoverImage: "/images/b-essentials-back.jpg",
  },
  {
    id: "adiario-cult",
    name: "Adiario Cult Tee",
    color: "Vintage Black",
    size: "M",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Playera oversized en lavado vintage con estampado \"House of Adiario\" al pecho. Algodón pesado, fit relajado.",
    price: 78,
    image: "/images/adiario-cult.png",
  },
  {
    id: "boxing",
    name: "Boxing Tee",
    color: "White",
    size: "M",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Playera oversized blanca con estampado universitario \"BRMJ\" al pecho. Algodón pesado, fit relajado.",
    price: 68,
    image: "/images/boxing.png",
  },
];

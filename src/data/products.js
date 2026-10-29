export const rawProducts = [
  {
    name: "Aam Ka Aachar",
    description: "A variety of pickles in small packs",
    reviews: "149 Reviews",
    rating: 4.8,
    image: "/P/mango-1.jpg",
    tag: "Himachali Special",
  },
  {
    name: "Mirch Ka Aachar",
    description: "Tasty dry mango pickle with no preservatives",
    reviews: "44 Reviews",
    rating: 4.4,
    image: "/P/chilii-1.jpg",
    tag: "Himachali Delight",
  },
  {
    name: "Nimbu Ka Aachar",
    description: "Made with sunflower oil and spices",
    reviews: "1668 Reviews",
    rating: 4.7,
    image: "/P/lime-1.jpg",
    tag: "Traditional Himachali",
  },
  {
    name: "Galgal Ka Aachar",
    description: "A spicy mango pickle with mustard oil",
    reviews: "528 Reviews",
    rating: 4.7,
    image: "/P/gal-1.jpg",
    tag: "Himachali Mustard Oil",
  },
  {
    name: "Garlic Aachar",
    description: "Tangy lemon pickle with a burst of spices",
    reviews: "350 Reviews",
    rating: 4.5,
    image: "/P/garlic-1.jpg",
    tag: "Himachali Garlic",
  },
  {
    name: "Ginger Aachar",
    description: "A variety of vegetables in a spicy, tangy sauce",
    reviews: "120 Reviews",
    rating: 4.6,
    image: "/P/ginger-1.jpg",
    tag: "Ginger Infused",
  },
  {
    name: "Aanwala Aachar",
    description: "Fiery green chillies pickled in mustard oil",
    reviews: "88 Reviews",
    rating: 4.8,
    image: "/P/Amla-1.jpg",
    tag: "Spicy Himachali",
  },
  {
    name: "Badhar (Dheyun Ka Achar)",
    description: "Spicy and aromatic garlic pickle, perfect for any meal",
    reviews: "210 Reviews",
    rating: 4.7,
    image: "/P/b-1-b.jpg",
    tag: "Himachali Garlic Lovers",
  },
  {
    name: "Mix Veg Aachar",
    description: "A healthy, crunchy mix of carrot and radish pickled with spices",
    reviews: "95 Reviews",
    rating: 4.3,
    image: "/P/mix-1.jpg",
    tag: "Himachali Crunch",
  },
  {
    name: "Lashuhra Aachar",
    description: "Made with fresh apples and organic vinegar",
    reviews: "35 Reviews",
    rating: 4.2,
    image: "/P/l-1.jpg",
    tag: "Himachali Unique Flavor",
  },
  {
    name: "Karyala Ka Aachar",
    description: "A spicy blend of chillies and garlic, perfect with parathas",
    reviews: "180 Reviews",
    rating: 4.6,
    image: "/P/k-1.jpg",
    tag: "Himachali Chili Garlic",
  },
  {
    name: "Kathal Ka Aachar",
    description: "A sweet and spicy pineapple pickle to balance your meals",
    reviews: "250 Reviews",
    rating: 4.7,
    image: "/P/dh-1.jpg",
    tag: "Himachali Sweet & Spicy",
  },
];

export const slugify = (l) =>
  l
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

export const buildProducts = (l) =>
  l.map((i, s) => {
    const u = 199 + s * 10,
      d = u + 60,
      f = Math.round(((d - u) / d) * 100),
      h = ["200g", "400g", "1kg"];
    return {
      ...i,
      id: s + 1,
      slug: slugify(i.name),
      images: [i.image, "/P/p-1.jpg", "/P/n-1.jpg", "/P/cta.jpg"],
      price: u,
      mrp: d,
      discount: f,
      sizes: h,
      highlights: [
        "Sun-cured & small-batch",
        "No artificial colors/preservatives",
        "Cold-pressed mustard/sunflower oil",
        "Farm-sourced, himachali style",
      ],
      packing: {
        type: "Glass jar, tamper-evident cap",
        shelfLife: "12 months (unopened)",
        storage: "Refrigerate after opening",
        oil: /mustard/i.test(i.tag) ? "Mustard Oil" : "Sunflower/Mustard Blend",
        origin: "Himachal Pradesh, India",
      },
    };
  });

export const allProducts = buildProducts(rawProducts);

import { useState } from "react";

export default function useProductSorting(initialProducts, category) {
  const [products, setProducts] = useState(initialProducts);
  const [sortOption, setSortOption] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSortChange = (option) => {
    if (option === sortOption) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortDirection("asc");
      setSortOption(option);
    }
  };

  const sortedProducts = () => {
    if (sortOption === "name_asc" || sortOption === "name_desc") {
      return products.slice().sort((a, b) => {
        if (sortOption === "name_asc") {
          return sortDirection === "asc"
            ? a.product_name.localeCompare(b.product_name)
            : b.product_name.localeCompare(a.product_name);
        } else {
          return sortDirection === "asc"
            ? b.product_name.localeCompare(a.product_name)
            : a.product_name.localeCompare(b.product_name);
        }
      });
    } else if (sortOption === "price_asc" || sortOption === "price_desc") {
      return products.slice().sort((a, b) => {
        if (sortOption === "price_asc") {
          return sortDirection === "asc"
            ? a.product_price - b.product_price
            : b.product_price - a.product_price;
        } else {
          return sortDirection === "asc"
            ? b.product_price - a.product_price
            : a.product_price - b.product_price;
        }
      });
    } else {
      return products;
    }
  };

  const isFrameCategory = category === "Рамки";

  const sortOptions = isFrameCategory
    ? [
        { value: "", label: "Без сортиране" },
        { value: "name_asc", label: "По име (А - Я)" },
        { value: "name_desc", label: "По име (Я - А)" },
      ]
    : [
        { value: "", label: "Без сортиране" },
        { value: "name_asc", label: "По име (А - Я)" },
        { value: "name_desc", label: "По име (Я - А)" },
        { value: "price_asc", label: "По цена (най-евтини)" },
        { value: "price_desc", label: "По цена (най-скъпи)" },
      ];

  return {
    products: sortedProducts(),
    sortOption,
    sortDirection,
    handleSortChange,
    setProducts,
    sortOptions,
  };
}

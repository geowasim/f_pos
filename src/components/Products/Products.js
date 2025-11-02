import { useContext, useState } from "react";
import ProductContext from "../../context/ProductContext";
import { useDefaultRateDiscount } from "../../hooks/useDefaultRateDiscount";
import Item from "./Item";

const Products = ({ onAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [product, setProduct] = useState(null);
  const categories = ["All", "Perfume", "Hair Mist", "Freshener"];
  const products = useContext(ProductContext);
  const { vatRate } = useDefaultRateDiscount();

  const handleOpenDetails = (perfume) => {
    setProduct(perfume);
  };

  const handleCloseDetails = () => {
    setProduct(null);
  };

  return (
    <div className="overflow-y-auto p-4 direction-rtl">
      <div className="flex flex-wrap justify-center gap-2 my-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2 py-1 text-xs rounded border ${
              selectedCategory === cat
                ? "bg-[#ffc363] text-black border-gray-500"
                : "bg-white text-[#cb7d00] border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products
          .filter((perfume) =>
            selectedCategory === "All"
              ? true
              : perfume.category === selectedCategory
          )
          .map((perfume) => (
            <div
              key={perfume.id}
              className="cart-product flex flex-col justify-center items-center relative bg-[white] p-4 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => {
                onAdd(perfume);
              }}
            >
              <div
                className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-[#fdc071] border-l-transparent cursor-help"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDetails(perfume);
                }}
              >
                <span className="absolute -top-7 right-2 text-[12px] font-bold font-serif text-black">
                  i
                </span>
              </div>

              <img
                src={perfume.image}
                alt={perfume.title}
                className="h-24 w-full object-contain rounded mb-2"
              />
              <p className="text-sm text-gray-500">
                {perfume.category.charAt(0).toUpperCase() +
                  perfume.category.slice(1)}
              </p>
              <p className="text-md font-semibold">
                {perfume.title.charAt(0).toUpperCase() + perfume.title.slice(1)}
              </p>
              <p className="text-sm font-bold mt-1 text-[#cb7d00]">
                {(perfume.price * (1 + vatRate)).toFixed(2)} ر.س
              </p>
            </div>
          ))}
      </div>
      {product && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={handleCloseDetails}
        >
          <div
            className="bg-white p-6 rounded max-w-[400px] w-[70%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Item item={product} />
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Products;

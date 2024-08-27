import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    // The concept of setting category state lies on if the current state include that category being selected
    const isValueIncludedInCat = category.includes(e.target.value);

    // filter out what already selected but get click again
    if (isValueIncludedInCat)
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    // add value to cat if it's not in cat
    else setCategory((prev) => [...prev, e.target.value]);
  };

  const toggleSubCategory = (e) => {
    const isValueIncludedInCat = subCategory.includes(e.target.value);
    if (isValueIncludedInCat)
      setSubCategory((prev) => prev.filter((c) => c !== e.target.value));
    else setSubCategory((prev) => [...prev, e.target.value]);
  };

  function applyFilter() {
    let productCopy = products.slice();

    if (search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productCopy);
  }

  function sortProduct(sortType) {
    let filterProductsCoppy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(
          filterProductsCoppy.sort((a, b) => a.price - b.price)
        );
        break;
      case "higt-low":
        setFilterProducts(
          filterProductsCoppy.sort((b, a) => b.price - a.price)
        );
        break;
      default:
        applyFilter();
        break;
    }
  }

  // applyFiter is run on first mount and category, subCategory change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl cursor-pointer flex items-center gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown icon"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3 cursor-pointer"
                type="checkbox"
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3 cursor-pointer"
                type="checkbox"
                value={"Women"}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3 cursor-pointer"
                type="checkbox"
                value={"Kids"}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3 cursor-pointer"
                type="checkbox"
                value={"Topwear"}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3 cursor-pointer"
                type="checkbox"
                value={"Bottomwear"}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3 cursor-pointer"
                type="checkbox"
                value={"Winterwear"}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product sort */}
          <select
            onChange={(e) => sortProduct(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High Price</option>
            <option value="high-low">Sort by: High to Low Price</option>
          </select>
        </div>
        {/* Map product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

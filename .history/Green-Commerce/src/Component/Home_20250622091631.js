import React from "react";
import "../Css/Home.css";
import Product from "./Product";
import Productbutton from "./Productbutton";
// If you have a second badge component, import it here:
// import Productbutton1 from "./Productbutton1";
import ImageSlider from "./Imageslider";
import products from "../assets/Products";

export default function Home() {
  // Split products into rows of 3
  const rows = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  const renderItem = item => {
    const {
      id,
      productName,
      productImage,
      price,
      rating,
      badge_id
    } = item;

    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));

    if (badge_id === 1) {
      return (
        <Productbutton
          key={id}
          id={id}
          title={productName}
          image={productImage}
          price={numericPrice}
          rating={rating}
        />
      );
    }

    // Uncomment if you have a second badge component:
    // if (badge_id === 2) {
    //   return (
    //     <Productbutton1
    //       key={id}
    //       id={id}
    //       title={productName}
    //       image={productImage}
    //       price={numericPrice}
    //       rating={rating}
    //     />
    //   );
    // }

    // Default:
    return (
      <Product
        key={id}
        id={id}
        title={productName}
        image={productImage}
        price={numericPrice}
        rating={rating}
      />
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="home__container">
        <ImageSlider />

        {rows.slice(0, 5).map((rowItems, rowIndex) => (
          <div className="home__row" key={rowIndex}>
            {rowItems.map(renderItem)}
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import "../Css/Home.css";
import Product from "./Product";
import Productbutton from "./Productbutton";
import Productbutton1 from "./Productbutton1";
import ImageSlider from "./Imageslider";
import products from "../assets/Products";

function Home() {
  // 1) Take only the first 5 products
  const firstFive = products.slice(0, 5);

  // 2) Split those 5 products into rows of up to 3 each
  const rows = [];
  for (let i = 0; i < firstFive.length; i += 3) {
    rows.push(firstFive.slice(i, i + 3));
  }

  const renderItem = (item) => {
    const { id, name, image, price, rating, badge_id } = item;
    const numericPrice = parseFloat(price.replace('$', ''));

    if (badge_id === 1) {
      return (
        <Productbutton
          key={id}
          id={id}
          title={name}
          image={image}
          price={numericPrice}
          rating={rating}
        />
      );
    }

    if (badge_id === 2) {
      return (
        <Productbutton1
          key={id}
          id={id}
          title={name}
          image={image}
          price={numericPrice}
          rating={rating}
        />
      );
    }

    return (
      <Product
        key={id}
        id={id}
        title={name}
        image={image}
        price={numericPrice}
        rating={rating}
      />
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <div className="home__container">
        <ImageSlider />

        {rows.map((rowItems, rowIndex) => (
          <div className="home__row" key={rowIndex}>
            {rowItems.map(renderItem)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

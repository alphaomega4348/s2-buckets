import React from "react";
import "../Css/Home.css";
import Product from "./Product";
import Productbutton from "./Productbutton";
import Productbutton1 from "./Productbutton1";
import ImageSlider from "./Imageslider";
import products from "../assets/Products";

function Home() {
  // Split products into rows of 3
  const rows = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  const renderItem = (item) => {
    const { id, name, image, price, rating, badge_id } = item;

    // Choose which component to render based on badge_id
    if (badge_id === 1) {
      return (
        <Productbutton
          key={id}
          id={id}
          title={name}
          image={image}
          price={parseFloat(price.replace('$', ''))}
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
          price={parseFloat(price.replace('$', ''))}
          rating={rating}
        />
      );
    }

    // Default to your standard Product component
    return (
      <Product
        key={id}
        id={id}
        title={name}
        image={image}
        price={parseFloat(price.replace('$', ''))}
        rating={rating}
      />
    );
  };

  return (
    <div  style={{width:'100%'}}>
      <div className="home__container">
        <ImageSlider />

        {rows
        .slice(0, 5)
        .map((rowItems, rowIndex) => (
          <div className="home__row" key={rowIndex}>
            {rowItems.map(renderItem)}
          </div>
      ))}
      </div>
    </div>
  );
}

export default Home;

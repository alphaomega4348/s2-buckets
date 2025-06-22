// Updated Home.js with inline styles for product cards and preserved classNames
import React from "react";
import "../Css/Home.css";
import Product from "./Product";
import Productbutton from "./Productbutton";
import Productbutton1 from "./Productbutton1";
import ImageSlider from "./Imageslider";
import products from "../assets/Products";

export default function Home() {
  // Take only first 5 products
  const firstFive = products.slice(0, 5);

  // Split into rows of up to 3
  const rows = [];
  for (let i = 0; i < firstFive.length; i += 3) {
    rows.push(firstFive.slice(i, i + 3));
  }

  // Inline styles
  const containerStyle = { width: '100%' };
  const rowInlineStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '16px 0' };
  const cardStyle = {
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '16px',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    margin: '8px 4px',
    flex: '1 1 calc(33% - 16px)',
    maxWidth: '300px',
    cursor: 'pointer'
  };
  const cardHoverStyle = { transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' };
  const imageStyle = { maxWidth: '100%', height: 'auto', marginBottom: '12px', borderRadius: '4px' };

  const renderItem = (item) => {
    const { id, name, image, price, rating, badge_id } = item;
    const numericPrice = parseFloat(price.replace("$", ""));

    const commonProps = { key: id, id, title: name, image, price: numericPrice, rating };
    let Component = Product;
    if (badge_id === 1) Component = Productbutton;
    if (badge_id === 2) Component = Productbutton1;

    return (
      <div
        key={id}
        style={cardStyle}
        onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
        onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
      >
        <img src={image} alt={name} style={imageStyle} />
        <Component {...commonProps} />
      </div>
    );
  };

  return (
    <div style={containerStyle} className="home">
      <div className="home__container">
        <ImageSlider />

        {rows.map((rowItems, idx) => (
          <div key={idx} className="home__row" style={rowInlineStyle}>
            {rowItems.map(renderItem)}
          </div>
        ))}
      </div>
    </div>
  );
}

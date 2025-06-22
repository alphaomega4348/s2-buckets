import React, { useState } from 'react';

export default function import React, { useState } from 'react';

export default function SuggestGreenCarousel() {
  const categories = [
    { image: '/images/bathroom.jpg', label: 'Bathroom' },
    { image: '/images/clean_beauty.jpg', label: 'Clean Beauty' },
    { image: '/images/kids.jpg', label: 'Kids' },
    { image: '/images/dental.jpg', label: 'Dental Hygiene' },
    { image: '/images/home_kitchen.jpg', label: 'Home & Kitchen' },
    { image: '/images/cleaning.jpg', label: 'Cleaning' },
    { image: '/images/hair.jpg', label: 'Hair Care' },
    { image: '/images/laundry.jpg', label: 'Laundry' }
  ];

  const visibleCount = 4;
  const [index, setIndex] = useState(0);

  // Handlers
  const handlePrev = () => setIndex((i) => Math.max(i - 1, 0));
  const handleNext = () => setIndex((i) => Math.min(i + 1, categories.length - visibleCount));

  // Styles
  const wrapper = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    margin: '24px 0'
  };

  const arrowStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#006600',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const viewport = {
    overflow: 'hidden',
    flex: 1
  };

  const track = {
    display: 'flex',
    transition: 'transform 0.3s ease',
    transform: `translateX(-${index * (250 + 16)}px)` // card width + gap
  };

  const card = {
    minWidth: '250px',
    marginRight: '16px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  };

  const imgStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const labelStyle = {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    color: '#fff',
    fontSize: '20px',
    textShadow: '0 2px 6px rgba(0,0,0,0.6)'
  };

  return (
    <div style={wrapper}>
      <button onClick={handlePrev} style={{ ...arrowStyle, marginRight: '8px' }} disabled={index === 0}>
        &lt;
      </button>
      <div style={viewport}>
        <div style={track}>
          {categories.map((cat, i) => (
            <div key={i} style={card}>
              <img src={cat.image} alt={cat.label} style={imgStyle} />
              <span style={labelStyle}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleNext} style={{ ...arrowStyle, marginLeft: '8px' }} disabled={index >= categories.length - visibleCount}>
        &gt;
      </button>
    </div>
  );
}
() {
    const categories = [
        { image: '/images/bathroom.jpg', label: 'Bathroom' },
        { image: '/images/clean_beauty.jpg', label: 'Clean Beauty' },
        { image: '/images/kids.jpg', label: 'Kids' },
        { image: '/images/dental.jpg', label: 'Dental Hygiene' },
        { image: '/images/home_kitchen.jpg', label: 'Home & Kitchen' },
        { image: '/images/cleaning.jpg', label: 'Cleaning' },
        { image: '/images/hair.jpg', label: 'Hair Care' },
        { image: '/images/laundry.jpg', label: 'Laundry' }
    ];

    const visibleCount = 4;
    const [index, setIndex] = useState(0);

    // Handlers
    const handlePrev = () => setIndex((i) => Math.max(i - 1, 0));
    const handleNext = () => setIndex((i) => Math.min(i + 1, categories.length - visibleCount));

    // Styles
    const wrapper = {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: '24px 0'
    };

    const arrowStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#006600',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const viewport = {
        overflow: 'hidden',
        flex: 1
    };

    const track = {
        display: 'flex',
        transition: 'transform 0.3s ease',
        transform: `translateX(-${index * (250 + 16)}px)` // card width + gap
    };

    const card = {
        minWidth: '250px',
        marginRight: '16px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer'
    };

    const imgStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    };

    const labelStyle = {
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        color: '#fff',
        fontSize: '20px',
        textShadow: '0 2px 6px rgba(0,0,0,0.6)'
    };

    return (
        <div style={wrapper}>
            <button onClick={handlePrev} style={{ ...arrowStyle, marginRight: '8px' }} disabled={index === 0}>
                &lt;
            </button>
            <div style={viewport}>
                <div style={track}>
                    {categories.map((cat, i) => (
                        <div key={i} style={card}>
                            <img src={cat.image} alt={cat.label} style={imgStyle} />
                            <span style={labelStyle}>{cat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleNext} style={{ ...arrowStyle, marginLeft: '8px' }} disabled={index >= categories.length - visibleCount}>
                &gt;
            </button>
        </div>
    );
}

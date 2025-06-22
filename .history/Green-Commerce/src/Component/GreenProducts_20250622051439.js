import React, { useState, useMemo,useEffect } from 'react';
import { FiSearch, FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import '../Css/navbargreen.css';
import { Link } from 'react-router-dom';
import cleaningcloth from "../assets/green products/cleaning/cleaningcloth.png"
import myproduct from '../assets/Products';
import SustainabilityReportsSection from './Sustainability';
const IMAGE_BASE = 'http://localhost:8080/uploads';
const leftFilterDefs = [
    { key: 'plasticFree', label: 'Plastic-Free' },
    { key: 'fscCertified', label: 'FSC Certified' },
    { key: 'carbonNeutral', label: 'Carbon Neutral Shipping' },
    { key: 'recycledMaterials', label: 'Recycled Materials' },
];

const Banner = () => (
    <div style={{
        backgroundColor: 'rgb(133, 191, 137)',
        padding: '1rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        animation: 'pulse 3s infinite'
    }}>
        <style>
            {`@keyframes pulse { 0% { transform: scale(1) } 50% { transform: scale(1.02) } 100% { transform: scale(1) } }`}
        </style>
        <h2 style={{ color: '#2E7D32', margin: 0 }}>Green Essentials –</h2>
        <h4 style={{ color: '#2E7D32', margin: 0 }}>Weekly Picks</h4>
    </div>
);
const filterLabels = {
    plasticFree: 'Plastic-Free',
    fscCertified: 'FSC Certified',
    carbonNeutral: 'Carbon Neutral Shipping',
    recycledMaterials: 'Recycled Materials',
};

const ProductCard = ({ p }) => {
    
    // pull the filename off of the full Windows path
    // inside ProductCard:
    const filename = p.productImage?.split(/[/\\]/).pop() || "";
    const src = `${IMAGE_BASE}/${filename}`;
    

    return (
        <div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1rem',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
            {p.grade && (
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: '#C8E6C9',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#2E7D32'
                }}>
                    {p.grade}
                </div>
            )}

            <img
                src={p.productImage || cleaningcloth}
                alt={p.productName}
                onError={e => e.currentTarget.src = cleaningcloth}
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'contain',
                    marginBottom: '1rem'
                }}
            />
            
            <h4 style={{
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
                margin: '0 0 0.5rem'
            }}>
                {p.productName}
            </h4>

            {/* Dynamic filter tags */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.25rem',
                fontSize: '0.8rem',
                color: '#555',
                flexGrow: 1
            }}>
                {Object.entries(p.filters)
                    .filter(([_, isOn]) => isOn)
                    .map(([key]) => (
                        <span key={key} style={{ color: 'green' }}>
                            {filterLabels[key]}
                        </span>
                    ))
                }
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '0.5rem'
            }}>
                <span style={{ fontWeight: 'bold' }}> ₹ {p.price}</span>
                <button
                    onClick={() => console.log(`Add ${p.name} to cart`)}
                    style={{
                        backgroundColor: '#2E7D32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
  
  
  
  

export default function GreenProducts({ description, topN = 5 }) {
  
    const [products, setProducts] = useState([]);
    const [recs, setRecs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [leftFilters, setLeftFilters] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = useMemo(
        () => Array.from(new Set(products.map(p => p.category))),
        [products]
    );

    const toggleLeft = key =>
        setLeftFilters(prev => ({ ...prev, [key]: !prev[key] }));

    // const visible = products.filter(p =>
    //     leftFilterDefs.every(f => !leftFilters[f.key] || p.filters[f.key]) &&
    //     (!selectedCategory || p.category === selectedCategory)
    // );
    const productsMap = useMemo(
        () => Object.fromEntries(products.map(p => [p._id, p])),
        [products]
    );

  

    const dataSource =myproduct;
    //  !description
    //     ? myproduct.slice(0,6)
    //  : recs.map(r => productsMap[r._id]).filter(Boolean);


    
    const visible = dataSource.filter(p =>
        leftFilterDefs.every(f => !leftFilters[f.key] || p.filters[f.key]) &&
        (!selectedCategory || p.category === selectedCategory)
      );
    console.log("🌱 GreenProducts render:", {
        description,
        recs,
    });

    useEffect(() => {
        if (!description) return;            // nothing to do until user searches
        setLoading(true);
        fetch('http://localhost:8000/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_name: description,
                top_n: topN
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(body => {
                // your endpoint returns { recommendations: [ { _id, productImage, description }, … ] }
                
                setRecs(body.recommendations);
                console.log("recs ",recs);
            })
            .catch(err => {
                console.error('Recommendation error:', err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [description, topN]);

    // if (!description) {
    //     return <p>Type something in search and click the button to get recommendations.</p>;
    // }
    // if (loading) return <p>Loading recommendations…</p>;
    // if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    // if (recs.length === 0) return <p>No recommendations found for “{description}”.</p>;
   
    useEffect(() => {
        // define an async fetcher
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:8080/getproducts");
                if (!res.ok) {
                    throw new Error(`Server responded ${res.status}`);
                }
                const data = await res.json();
                setProducts(data);
                console.log("products are : ", products);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError(err.message);
            }
        };

        fetchProducts();
    }, []); // re-run whenever `third` changes



   
    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            alignItems: 'stretch'  ,  // make both asides same height as main
            backgroundColor: ' #E8F5E9',
        }}>
            {/* LEFT SIDEBAR: filters + mini picks */}
            <aside style={{
                width: '20%',
                backgroundColor: 'rgb(237, 246, 237)',
                borderRadius: '8px',
                padding: '1rem',
                fontFamily: "'Amazon Ember', 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 200,
                fontSize: '1rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gridAutoRows: 'min-content',
                rowGap: '0.5rem',
                alignContent: 'start',
                boxShadow: '0 1px 3px rgb(133, 191, 137)'
            }}>
            
                <h3 style={{ gridColumn: '1 / -1', marginBottom: '0.5rem' }}>Sustainability Center</h3>
                  
                  <div>
                      <React.Fragment>
                        <li>
                            <Link
                                to="/gift-cards"
                            
                                style={{
                                    fontFamily: "'Amazon Ember', 'Helvetica Neue', Arial, sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: 'green'
                                }}
                            >
                                Gift cards
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/seller"
                              
                                style={{
                                    fontFamily: "'Amazon Ember', 'Helvetica Neue', Arial, sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: 'green'
                                }}
                            >
                                Seller
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/education"
                               
                                style={{
                                    fontFamily: "'Amazon Ember', 'Helvetica Neue', Arial, sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color:'green'
                                }}
                            >
                                Educational Section
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/sustainability"
                               
                                style={{
                                    fontFamily: "'Amazon Ember', 'Helvetica Neue', Arial, sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: 'green'
                                }}
                            >
                                Sustainability Reports
                            </Link>
                        </li>
                      </React.Fragment>
                  </div>
                    
                    
                             

                <h3 style={{ gridColumn: '1 / -1', marginBottom: '0.5rem' }}>Filters</h3>

                {leftFilterDefs.map(f => (
                    <React.Fragment key={f.key}>
                        <span>{f.label}</span>
                        <input
                            type="checkbox"
                            checked={!!leftFilters[f.key]}
                            onChange={() => toggleLeft(f.key)}
                        />
                    </React.Fragment>
                ))}

                {/* fill any remaining space with quick‐pick images */}
                <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                    <h4>Quick Picks</h4>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.5rem'
                    }}>
                        {products.slice(0, 10).map(p => (
                            <img
                                key={p._id}
                                src={p.productImage}
                                alt={p.productName}
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                        ))}
                    </div>
                </div>
            </aside>

           
           
            {/* MAIN GRID */}
            <main style={{ flex: 1 }}>
                <Banner />

                <div style={{
                    display: 'grid',
                   
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(3, 1fr)',  // exactly 3 columns
                    // justifyItems: 'center',      // center each card in its cell
                    // alignItems: 'start',         // cards start at top of cell
                    // padding: '1rem 0'
                    marginRight:'10px',
                    gridAutoFlow: 'row dense',
                }}
               
                >
               
                    {dataSource
                           .filter(p => !!p.productImage)
                           // if description, dataSource is full rec list; if no description, it's already sliced to 6
                           .map(p => (
                                  <Link key={p._id} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <ProductCard p={p} />
                                      </Link>
                                ))}
                   
                </div>
            </main>


            {/* RIGHT BAR: category selector */}
           
            <aside style={{
                width: '200px',
                backgroundColor: 'rgb(237, 246, 237)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gridAutoRows: 'min-content',
                rowGap: '0.5rem',
                alignContent: 'start',
                boxShadow: '0 1px 3px rgb(133, 191, 137)'
            }}>
                <h3 style={{ gridColumn: '1 / -1', marginBottom: '0.5rem' }}>Categories</h3>

                
                {categories.map(cat => (
                    <React.Fragment key={cat}>
                        <span>{cat}</span>
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                        />
                    </React.Fragment>


                ))}
                <button onClick={() => setSelectedCategory(null)} style={{ marginTop: '1rem' }}>
                    Clear
                </button>

              
                
            </aside>

        </div>
    );
}

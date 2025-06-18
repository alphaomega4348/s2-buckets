import React, { useState, useMemo } from 'react';
import { FiSearch, FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import '../Css/navbargreen.css';
import { Link } from 'react-router-dom';

// cleaning
import floorCleanerImg from '../assets/green products/cleaning/floorcleaner.png';
import dishwashImg from '../assets/green products/cleaning/dishwash.png';
import cleaningClothImg from '../assets/green products/cleaning/cleaningcloth.png';
import powderImg from '../assets/green products/cleaning/powder.png';
import handwashImg from '../assets/green products/cleaning/handwash.png';

// bathroom
import cleanerSprayImg from '../assets/green products/bathroom/cleanerspray.png';
import toiletBowlCleanerImg from '../assets/green products/bathroom/toiletbowlcleaner.png';
import toiletPaperRollImg from '../assets/green products/bathroom/toiletpaperroll.png';

// baby products
import shampooImg1 from '../assets/green products/baby products/shampo.png';
import diapersImg from '../assets/green products/baby products/Diapers.png';
import beddingImg from '../assets/green products/baby products/babybedding.png';

// gardening
import fertilizerImg from '../assets/green products/gardening/fertilizer.png';
import mulchImg from '../assets/green products/gardening/mulch.png';
import plantPotsImg from '../assets/green products/gardening/plantpots.png';

// home decor
import wallHangingImg from '../assets/green products/home decor/wallhanging.png';
import laceRibbonImg from '../assets/green products/home decor/Laceribbon.png';
import figurineImg from '../assets/green products/home decor/hadcraftedFigurine.png';

// kitchen
import basketImg from '../assets/green products/kitchen/basket.png';
import cuttingBoardImg from '../assets/green products/kitchen/cuttingboard.png';
import servingBowlImg from '../assets/green products/kitchen/servingbowl.png';
import vegBagsImg from '../assets/green products/kitchen/vegetablebags.png';
import coastersImg from '../assets/green products/kitchen/woodenCoasters.png';

// Office images
import ballPensImg from '../assets/green products/office/ballpens.png';
import giftSetImg from '../assets/green products/office/giftset.png';
import seedPencilsImg from '../assets/green products/office/seedpencils.png';

// Personal use images
import handcraftedShopImg from '../assets/green products/personaluse/handcraftedshop.png';
import lipBalmImg from '../assets/green products/personaluse/lipbalm.png';
import shampooImg from '../assets/green products/personaluse/shampobar.png';

// Pets images
import areaFreshenerImg from '../assets/green products/pets/areafreshner.png';
import petGroomingImg from '../assets/green products/pets/petgroomingcloth.png';
import petHairRemoverImg from '../assets/green products/pets/pethairremover.png';

// Travel images
import solarChargerImg from '../assets/green products/travel/solarcharger.png';
import toiletriesImg from '../assets/green products/travel/toileteries.png';
import travelMugImg from '../assets/green products/travel/travelmug.png';
import waterBottleImg from '../assets/green products/travel/waterbottle.png';
import SustainabilityReportsSection from './Sustainability';

// 1. Hard-coded JSON data for products including filter flags and category field
const products = [
    // { id: 1, name: 'Compostable Phone Charger', image: '', price: '$18.99', grade: 'A+', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Electronics' },
    // { id: 2, name: 'Recycled Notebook Set', image: '', price: '$22.95', grade: 'A', filters: { plasticFree: false, fscCertified: true, carbonNeutral: false, recycledMaterials: true }, category: 'Stationery' },
    { id: 3, name: 'Nimyle Eco-Friendly Floor Cleaner', image: floorCleanerImg, price: '$12.49', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Cleaning' },
    { id: 4, name: "Happi Planet's Eco-friendly Dishwashing Liquid", image: dishwashImg, price: '$8.99', grade: 'A', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Cleaning' },
    { id: 5, name: 'SOFTSPUN Microfiber Cleaning Cloths', image: cleaningClothImg, price: '$15.50', grade: 'A+', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Cleaning' },
    { id: 6, name: 'Greenworx Ultra Laundry Powder', image: powderImg, price: '$11.99', grade: 'B+', filters: { plasticFree: true, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Cleaning' },
    { id: 7, name: "Happi Planet's Liquid Handwash", image: handwashImg, price: '$9.75', grade: 'A', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Cleaning' },
    { id: 8, name: 'Herbal Strategi Bathroom Cleaner Spray', image: cleanerSprayImg, price: '$14.20', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Bathroom' },
    { id: 9, name: 'Born Good Plant-Based Liquid Toilet Bowl Cleaner', image: toiletBowlCleanerImg, price: '$7.80', grade: 'A', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Bathroom' },
    { id: 10, name: 'Beco Bamboo 3 Ply Toilet Paper Roll', image: toiletPaperRollImg, price: '$5.99', grade: 'B+', filters: { plasticFree: false, fscCertified: true, carbonNeutral: false, recycledMaterials: false }, category: 'Bathroom' },
    { id: 11, name: "Earth Rhythm's Murumuru Butter Shampoo Bar", image: shampooImg, price: '$6.49', grade: 'A', filters: { plasticFree: true, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Baby Products' },
    { id: 12, name: 'Eco-Friendly Diapers', image: diapersImg, price: '$19.99', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Baby Products' },
    { id: 13, name: 'Organic Baby Bedding', image: beddingImg, price: '$34.50', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Baby Products' },
    { id: 14, name: 'Organic Fertilizers', image: fertilizerImg, price: '$9.99', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Gardening' },
    { id: 15, name: 'Mulch (Organic)', image: mulchImg, price: '$7.49', grade: 'A-', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Gardening' },
    { id: 16, name: 'Biodegradable Plant Pots', image: plantPotsImg, price: '$12.99', grade: 'B+', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Gardening' },
    { id: 17, name: 'Bamboowala Flutist Scenery Decorative Wall Hanging', image: wallHangingImg, price: '$24.99', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Home Decor' },
    { id: 18, name: "HOME BUY's Jute Lace Natural Burlap Rolls", image: laceRibbonImg, price: '$13.99', grade: 'A-', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Home Decor' },
    { id: 19, name: 'KARIGAARI Hand Crafted Eco-Friendly Figurine', image: figurineImg, price: '$18.49', grade: 'B+', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Home Decor' },
    { id: 20, name: 'Bulfyss Large Natural Bamboo Wood Cutting Board', image: cuttingBoardImg, price: '$29.99', grade: 'A+', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Kitchen' },
    { id: 21, name: 'Necavu Eco-friendly Natural Vegetables Bags', image: vegBagsImg, price: '$11.50', grade: 'B', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Kitchen' },
    { id: 22, name: 'Irida Naturals Wheat Straw Serving Bowls', image: servingBowlImg, price: '$19.99', grade: 'A-', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Kitchen' },
    { id: 23, name: 'Wooden Coasters Set', image: coastersImg, price: '$9.99', grade: 'B+', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Kitchen' },
    { id: 24, name: 'Green Chapter Plantable Seed Ball Pens', image: ballPensImg, price: '$9.99', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Office' },
    { id: 25, name: 'CARIGARI Gift Set', image: giftSetImg, price: '$24.99', grade: 'A-', filters: { plasticFree: false, fscCertified: true, carbonNeutral: false, recycledMaterials: false }, category: 'Office' },
    { id: 26, name: 'Plantable Seed Pencils', image: seedPencilsImg, price: '$14.99', grade: 'B+', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Office' },
    { id: 27, name: 'Handcrafted Shop Soap', image: handcraftedShopImg, price: '$4.99', grade: 'A-', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Personal Care' },
    { id: 28, name: 'Biotique Bio Fruit Lip Balm', image: lipBalmImg, price: '$3.75', grade: 'B', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Personal Care' },
    { id: 29, name: 'Personal Shampoo Bar', image: shampooImg, price: '$6.49', grade: 'A', filters: { plasticFree: true, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Personal Care' },
    { id: 30, name: 'ODO-RITE Pet Area Freshener', image: areaFreshenerImg, price: '$9.50', grade: 'A', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Pets' },
    { id: 31, name: 'NAVA PAVA Pet Hair Remover', image: petHairRemoverImg, price: '$7.25', grade: 'B+', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Pets' },
    {
        id: 32, name: 'Aufews Magic Pet Grooming Gloves', image: petGroomingImg, price: '$12.00', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Pets'
    },
    { id: 33, name: 'Solar-Powered Charger', image: solarChargerImg, price: '$29.99', grade: 'A+', filters: { plasticFree: false, fscCertified: false, carbonNeutral: true, recycledMaterials: false }, category: 'Travel' },
    { id: 34, name: 'Travel Mug', image: travelMugImg, price: '$14.99', grade: 'A', filters: { plasticFree: true, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Travel' },
    { id: 35, name: 'Reusable Water Bottle', image: waterBottleImg, price: '$12.99', grade: 'A', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: false }, category: 'Travel' },
    { id: 36, name: 'Biodegradable Toiletries', image: toiletriesImg, price: '$16.50', grade: 'B+', filters: { plasticFree: false, fscCertified: false, carbonNeutral: false, recycledMaterials: true }, category: 'Travel' }
];

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

const ProductCard = ({ p }) => (
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
            src={p.image || 'https://via.placeholder.com/150'}
            alt={p.name}
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
            {p.name}
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
                    <span key={key} style={{
                        // backgroundColor: '#EFEFEF',
                        // padding: '2px 6px',
                        // borderRadius: '4px'
                        color:'green'
                    }}>
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
            <span style={{ fontWeight: 'bold' }}>{p.price}</span>
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
  
  
  

export default function GreenProducts() {
    const [leftFilters, setLeftFilters] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = useMemo(
        () => Array.from(new Set(products.map(p => p.category))),
        []
    );

    const toggleLeft = key =>
        setLeftFilters(prev => ({ ...prev, [key]: !prev[key] }));

    const visible = products.filter(p =>
        leftFilterDefs.every(f => !leftFilters[f.key] || p.filters[f.key]) &&
        (!selectedCategory || p.category === selectedCategory)
    );

 
   

     

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
                        {products.slice(0, 20).map(p => (
                            <img
                                key={p.id}
                                src={p.image}
                                alt={p.name}
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                        ))}
                    </div>
                </div>
            </aside>

            {/* MAIN GRID */}
           
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
                    marginRight:'10px'
                }}>
                    {visible.map(p => <ProductCard key={p.id} p={p} />)}
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

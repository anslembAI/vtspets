import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const products = [
    // Premium Items
    {
        id: 1,
        name: 'Orthopedic Memory Foam Bed',
        price: '$129.99',
        desc: 'With cooling gel and human-grade mattress foam.',
        img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 2,
        name: 'GPS Smart Collar',
        price: '$149.50',
        desc: 'Real-time LTE tracking with health and activity monitoring.',
        img: 'https://images.unsplash.com/photo-1605367808298-b80155b11229?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 3,
        name: 'Automatic Ball Launcher',
        price: '$89.95',
        desc: 'Interactive high-tech launcher with adjustable distance.',
        img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 4,
        name: 'Italian Leather Harness',
        price: '$110.00',
        desc: 'Hand-stitched full-grain leather with 24k gold-plated hardware.',
        img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 5,
        name: 'Smart WiFi Pet Camera',
        price: '$199.00',
        desc: '360-degree rotation, 4K video, and remote treat tossing.',
        img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 6,
        name: 'Designer Airline-Approved Carrier',
        price: '$175.00',
        desc: 'Luxury travel tote with mesh ventilation and faux-fur lining.',
        img: 'https://images.unsplash.com/photo-1555666795-a2283a5e82b7?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 7,
        name: 'Automated Water Fountain',
        price: '$75.00',
        desc: 'Stainless steel with UV-C sterilization.',
        img: 'https://images.unsplash.com/photo-1575846740685-649e15df2ce7?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 8,
        name: 'All-Terrain Stroller',
        price: '$250.00',
        desc: 'Shock-absorbing wheels and canopy for senior dogs.',
        img: 'https://images.unsplash.com/photo-1585748835848-d3db7b0561e1?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 9,
        name: 'Biometric Microchip Feeder',
        price: '$180.00',
        desc: 'Scans chips to open lid for specific diet management.',
        img: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 10,
        name: 'Custom Weighted Anxiety Vest',
        price: '$65.00',
        desc: 'Medical-grade pressure wrap for storm and firework relief.',
        img: 'https://images.unsplash.com/photo-1520111162235-51d8d3f18e9c?auto=format&fit=crop&w=500&q=80'
    },
    // Standard Items
    {
        id: 11,
        name: 'Nylon Adjustable Collar',
        price: '$12.00',
        desc: 'Durable, basic nylon with a plastic quick-release buckle.',
        img: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 12,
        name: 'Standard Retractable Leash',
        price: '$16.50',
        desc: '5-meter cord leash with a simple thumb-lock mechanism.',
        img: 'https://images.unsplash.com/photo-1551065646-cbe1b777aab8?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 13,
        name: 'Tennis Ball Launcher (Manual)',
        price: '$9.95',
        desc: 'Plastic "thrower" stick for increased fetch distance.',
        img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 14,
        name: 'Stainless Steel Food Bowl',
        price: '$8.99',
        desc: 'Classic, rust-resistant, and dishwasher-safe bowl.',
        img: 'https://images.unsplash.com/photo-1574621100236-d25a64a4a28e?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 15,
        name: 'Rubber Squeaker Toy',
        price: '$5.99',
        desc: 'Standard durable latex toy for aggressive chewers.',
        img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 16,
        name: 'Fleece Paw Blanket',
        price: '$14.00',
        desc: 'Lightweight, machine-washable polyester fleece.',
        img: 'https://images.unsplash.com/photo-1612531385446-f7e6d131e164?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 17,
        name: 'Silicone Travel Bowl',
        price: '$6.50',
        desc: 'Collapsible pocket-sized bowl with carabiner clip.',
        img: 'https://images.unsplash.com/photo-1605634591245-7dfb2496df87?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 18,
        name: 'LED Safety Clip',
        price: '$4.95',
        desc: 'Small clip-on light for night walks.',
        img: 'https://images.unsplash.com/photo-1609102248009-8284714ab66a?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 19,
        name: 'Standard Grooming Brush',
        price: '$12.50',
        desc: 'Double-sided pin and bristle brush.',
        img: 'https://images.unsplash.com/photo-1516470162597-2a441dfddf52?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 20,
        name: 'Waste Bag Dispenser',
        price: '$3.99',
        desc: 'Plastic bone-shaped clip for leashes.',
        img: 'https://images.unsplash.com/photo-1604186838329-87c2fb8dd3c9?auto=format&fit=crop&w=500&q=80'
    },
    // Cat Items - Premium
    {
        id: 21,
        name: 'Self-Cleaning Litter Box',
        price: '$599.00',
        desc: 'Fully automated with odor-sealing waste drawers.',
        img: 'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 22,
        name: 'Multi-Level Cat Tree',
        price: '$249.99',
        desc: 'Modern wood construction with replaceable sisal pads.',
        img: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 23,
        name: 'App-Controlled Laser',
        price: '$45.00',
        desc: 'Set schedules for remote play sessions via smartphone.',
        img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 24,
        name: 'Ceramic Water Fountain',
        price: '$65.00',
        desc: 'Ultra-quiet motor with carbon filtration.',
        img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 25,
        name: 'Heated Thermal Cat Pod',
        price: '$85.00',
        desc: 'Enclosed "cave" bed with pressure-activated heating.',
        img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 26,
        name: 'Electronic Smart Flap',
        price: '$199.00',
        desc: 'Microchip-activated door to keep out strays.',
        img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 27,
        name: 'Climbing Wall Set',
        price: '$320.00',
        desc: 'Modular wooden shelves, bridges, and scratching pillars.',
        img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 28,
        name: 'Automated Kibble Dispenser',
        price: '$120.00',
        desc: 'Portion-controlled feeder with voice-recording.',
        img: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 29,
        name: 'Luxury Bubble Backpack',
        price: '$110.00',
        desc: 'Hard-shell ventilated carrier with panoramic window.',
        img: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 30,
        name: 'Indoor Litter Garden',
        price: '$28.00',
        desc: 'Hydroponic soil-free real grass system.',
        img: 'https://images.unsplash.com/photo-1615807713086-bfc4975801d7?auto=format&fit=crop&w=500&q=80'
    },
    // Cat Items - Standard
    {
        id: 31,
        name: 'Cardboard Scratching Lounge',
        price: '$18.50',
        desc: 'Reversible corrugated cardboard scratcher.',
        img: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 32,
        name: 'Feather Wand Toy',
        price: '$8.99',
        desc: 'Simple plastic stick with bells and feathers.',
        img: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 33,
        name: 'Breakaway Bell Collar',
        price: '$10.00',
        desc: 'Safety collar with a quick-release clasp.',
        img: 'https://images.unsplash.com/photo-1511044568932-338cba0fb803?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 34,
        name: 'Plastic Hooded Litter Box',
        price: '$35.00',
        desc: 'Basic entry-level box with a removable top.',
        img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 35,
        name: 'Catnip-Filled Plush Mouse',
        price: '$4.50',
        desc: 'Small fabric toy with dried catnip.',
        img: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 36,
        name: 'Plastic Slow Feeder Bowl',
        price: '$12.99',
        desc: 'Maze-style bowl to prevent fast eating.',
        img: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 37,
        name: 'Sisal Scratching Post',
        price: '$24.99',
        desc: 'Basic vertical post with a hanging toy.',
        img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 38,
        name: 'Self-Grooming Wall Brush',
        price: '$7.99',
        desc: 'Plastic corner-mounted bristles.',
        img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 39,
        name: 'Standard Litter Scoop',
        price: '$2.99',
        desc: 'Durable plastic scoop with large vents.',
        img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 40,
        name: 'Crinkle Tunnel',
        price: '$15.00',
        desc: 'Folding polyester tube for hide-and-seek.',
        img: 'https://images.unsplash.com/photo-1511044568932-338cba0fb803?auto=format&fit=crop&w=500&q=80'
    },
    // Bird Items
    {
        id: 41,
        name: 'Wrought Iron Flight Cage',
        price: '$450.00',
        desc: 'Large, powder-coated aviary with rolling casters and seed guards.',
        img: 'https://images.unsplash.com/photo-1555666795-a2283a5e82b7?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 42,
        name: 'Stainless Steel Foraging Wheel',
        price: '$35.00',
        desc: 'Advanced mental stimulation toy for large parrots.',
        img: 'https://images.unsplash.com/photo-1552728089-57bdde30ebd1?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 43,
        name: 'Full-Spectrum Avian Floor Lamp',
        price: '$120.00',
        desc: 'Mimics natural sunlight for Vitamin D3 synthesis.',
        img: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 44,
        name: 'Custom Acrylic Play Gym',
        price: '$85.00',
        desc: 'Modular tabletop playground with ladders and swings.',
        img: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea218?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 45,
        name: 'Heated Bird Perch',
        price: '$42.00',
        desc: 'Thermostatically controlled perch to prevent leg cramping.',
        img: 'https://images.unsplash.com/photo-1549488344-c705952d7ee0?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 46,
        name: 'Digital Incubator',
        price: '$210.00',
        desc: 'Precision temperature and humidity control for hatching.',
        img: 'https://images.unsplash.com/photo-1551065646-cbe1b777aab8?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 47,
        name: 'Smart Sound Mimicry Trainer',
        price: '$65.00',
        desc: 'Voice-activated device to help teach birds to speak.',
        img: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 48,
        name: 'Luxury Flight Suit (Harness)',
        price: '$38.00',
        desc: 'Premium spandex harness with a "diaper" pouch.',
        img: 'https://images.unsplash.com/photo-1605367808298-b80155b11229?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 49,
        name: 'UV-C Air Purifier',
        price: '$175.00',
        desc: 'Designed specifically to filter bird dander and powder down.',
        img: 'https://images.unsplash.com/photo-1585748835848-d3db7b0561e1?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 50,
        name: 'Electronic Misting Shower',
        price: '$55.00',
        desc: 'Automated gentle misting system for tropical species.',
        img: 'https://images.unsplash.com/photo-1605634591245-7dfb2496df87?auto=format&fit=crop&w=500&q=80'
    },
    // Fish Items
    {
        id: 51,
        name: 'Rimless Opti-White Glass Tank',
        price: '$180.00',
        desc: 'High-clarity, low-iron glass for professional aquascaping.',
        img: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 52,
        name: 'Programmable LED Reef Light',
        price: '$210.00',
        desc: 'WiFi-enabled with sunrise/sunset and storm simulations.',
        img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 53,
        name: 'External Canister Filter',
        price: '$145.00',
        desc: 'Multi-stage filtration with integrated UV sterilizer.',
        img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 54,
        name: 'Automatic Dosing Pump',
        price: '$95.00',
        desc: 'Precisely delivers liquid fertilizers or reef supplements.',
        img: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 55,
        name: 'CO2 Injection System',
        price: '$130.00',
        desc: 'Complete kit with regulator and solenoid for planted tanks.',
        img: 'https://images.unsplash.com/photo-1533206482811-9a70085a1a1f?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 56,
        name: 'Electronic Water Monitor',
        price: '$160.00',
        desc: 'Real-time digital testing for pH, Temp, and Salinity.',
        img: 'https://images.unsplash.com/photo-1581093458891-9f3039698d48?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 57,
        name: 'Silent Wavemaker',
        price: '$55.00',
        desc: 'Magnetic-drive pump for natural reef current simulation.',
        img: 'https://images.unsplash.com/photo-1540340061722-9293d5163008?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 58,
        name: 'Automated Fish Feeder',
        price: '$45.00',
        desc: 'WiFi-connected with moisture-proof food chamber.',
        img: 'https://images.unsplash.com/photo-1523351988882-95df8712e0da?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 59,
        name: 'Titanium Aquarium Heater',
        price: '$75.00',
        desc: 'Shatterproof heating with external digital controller.',
        img: 'https://images.unsplash.com/photo-1606822368383-7d727dbf8c09?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 60,
        name: 'Reversed Osmosis (RO/DI) System',
        price: '$199.00',
        desc: '4-stage water purification for pristine water quality.',
        img: 'https://images.unsplash.com/photo-1616766907727-4a02ae6a4579?auto=format&fit=crop&w=500&q=80'
    }
];

const ProductSection = ({ selectedCategory = 'All' }) => {
    const { addToCart } = useCart();

    const getCategory = (id) => {
        if (id >= 1 && id <= 20) return 'Dog';
        if (id >= 21 && id <= 40) return 'Cat';
        if (id >= 41 && id <= 50) return 'Bird';
        if (id >= 51 && id <= 60) return 'Fish';
        return 'Unknown';
    };

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => getCategory(p.id) === selectedCategory);

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.replace('$', '')),
            image: product.img
        });
    };

    return (
        <section id="shop" className="section product-section">
            <div className="container">
                <h2 className="section-title">
                    {selectedCategory === 'All' ? 'All Accessories' : `${selectedCategory} Accessories`}
                </h2>
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img src={product.img} alt={product.name} />
                            </div>
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', lineHeight: '1.4' }}>{product.desc}</p>
                                <p className="product-price">{product.price}</p>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="promo-banner">
                    <div className="promo-content">
                        <h3>Up to 50% Off!</h3>
                        <button className="btn btn-secondary">VIEW DEALS</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;

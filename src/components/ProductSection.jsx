import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const products = [
    { id: 1, name: 'Premium Collar', price: '$24.00', img: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Portable Carrier', price: '$85.00', img: 'https://images.unsplash.com/photo-1595182963162-42ed2d346399?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Ceramic Bowl', price: '$15.00', img: 'https://images.unsplash.com/photo-1543169107-5b6510d96d99?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Chew Toy', price: '$12.00', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80' }
];

const ProductSection = () => {
    const { addToCart } = useCart();

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
                <h2 className="section-title">Pet Accessories</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img src={product.img} alt={product.name} />
                            </div>
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
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

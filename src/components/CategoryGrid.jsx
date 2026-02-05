import React from 'react';
import { Dog, Cat, Bird, Fish, ArrowRight } from 'lucide-react';

const categories = [
    { id: 1, name: 'Dog', bg: '#F5A623', icon: <Dog size={40} /> },
    { id: 2, name: 'Cat', bg: '#F2C94C', icon: <Cat size={40} /> },
    { id: 3, name: 'Bird', bg: '#56CCF2', icon: <Bird size={40} /> },
    { id: 4, name: 'Fish', bg: '#EB5757', icon: <Fish size={40} /> }
];

const CategoryGrid = ({ onCategorySelect }) => {
    const handleCategoryClick = (categoryName) => {
        if (onCategorySelect) {
            onCategorySelect(categoryName);
        }
        const shopSection = document.getElementById('shop');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="categories" className="section categories-section">
            <div className="container">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-grid">
                    {categories.map((cat) => (
                        <div key={cat.id} className="category-item">
                            <div
                                className="category-card"
                                style={{ '--cat-color': cat.bg }}
                                onClick={() => handleCategoryClick(cat.name)}
                            >
                                <div className="category-icon-wrapper">
                                    {cat.icon}
                                </div>
                                <div className="category-content">
                                    <span className="category-label">{cat.name}</span>
                                    <span className="category-action">
                                        Shop Now <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;

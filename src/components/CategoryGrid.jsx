import React from 'react';

const categories = [
    { id: 1, name: 'Dog', bg: '#F5A623' },
    { id: 2, name: 'Cat', bg: '#F2C94C' },
    { id: 3, name: 'Bird', bg: '#56CCF2' },
    { id: 4, name: 'Fish', bg: '#EB5757' }
];

const CategoryGrid = () => {
    return (
        <section className="section categories-section">
            <div className="container">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-grid">
                    {categories.map((cat) => (
                        <div key={cat.id} className="category-item">
                            <div className="category-box" style={{ '--cat-color': cat.bg }}>
                                {/* Placeholder vectors would go here, using text for now */}
                                <div className="category-illustration">
                                    {cat.name === 'Dog' && '🐶'}
                                    {cat.name === 'Cat' && '🐱'}
                                    {cat.name === 'Bird' && '🦜'}
                                    {cat.name === 'Fish' && '🐠'}
                                </div>
                            </div>
                            <span className="category-label">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;

import React from 'react';

const Hero = () => {
    const handleShopNow = () => {
        const categorySection = document.getElementById('categories');
        if (categorySection) {
            categorySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="about" className="hero-section">
            <div className="hero-container">
                <div className="hero-card">
                    <div className="hero-image-side">
                        <img
                            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Golden Retriever"
                            className="hero-img"
                        />
                    </div>
                    <div className="hero-content-side">
                        <h1 className="hero-title">Pet Shop <br /> Supplies</h1>
                        <p className="hero-desc">Quality products for your best friend.</p>
                        <button className="btn btn-primary" onClick={handleShopNow}>SHOP NOW</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

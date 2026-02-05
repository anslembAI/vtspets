import React from 'react';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Basic Groom",
        price: 49,
        features: ["Bath & Blow Dry", "Nail Trimming", "Ear Cleaning", "Brush Out"],
        highlight: false
    },
    {
        name: "Premium Spa",
        price: 89,
        features: ["All Basic Features", "Haircut & Styling", "Teeth Brushing", "Paw Balm Treatment", "Blueberry Facial"],
        highlight: true
    },
    {
        name: "Ultimate Pamper",
        price: 129,
        features: ["All Premium Features", "Anal Gland Expression", "De-shedding Treatment", "Take-home Bandana", "Photo Session"],
        highlight: false
    }
];

const Services = () => {
    return (
        <section id="services" className="section services-section">
            <div className="container">
                <div className="text-center mb-12">
                    <span className="subtitle">Our Services</span>
                    <h2 className="section-title">Grooming Packages</h2>
                    <p className="max-w-2xl mx-auto text-muted">
                        Treat your furry friend to a spa day with our professional grooming services.
                    </p>
                </div>

                <div className="pricing-grid">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`pricing-card ${plan.highlight ? 'highlight' : ''}`}>
                            {plan.highlight && <div className="popular-badge">Most Popular</div>}
                            <h3>{plan.name}</h3>
                            <div className="price">
                                <span className="currency">$</span>
                                <span className="amount">{plan.price}</span>
                            </div>
                            <ul className="features-list">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        <div className="check-icon"><Check size={14} /></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'} w-full`}>
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = ({ selectedService }) => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h2 className="section-title text-left">Get in Touch</h2>
                        <p className="contact-desc">
                            Have questions about our products or services? We'd love to hear from you.
                            Visit our store or send us a message.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon"><Phone size={20} /></div>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon"><Mail size={20} /></div>
                                <div>
                                    <h4>Email</h4>
                                    <p>hello@vtspets.com</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon"><MapPin size={20} /></div>
                                <div>
                                    <h4>Location</h4>
                                    <p>123 Pet Street, Pawsome City</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form">
                        <div className="form-group">
                            <label>Service / Package</label>
                            <input
                                type="text"
                                placeholder="General Inquiry or Package Name"
                                defaultValue={selectedService}
                                key={selectedService} // Force re-render when prop changes
                            />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Your email" />
                        </div>
                        <div className="form-group">
                            <label>Date & Time (For Bookings)</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input type="date" className="w-full" />
                                <input type="time" className="w-full" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="4" placeholder="How can we help?"></textarea>
                        </div>
                        <button type="button" className="btn btn-primary w-full">
                            Send Message <Send size={16} className="ml-2" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

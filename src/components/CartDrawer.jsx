
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { salesService } from "../services/salesService";
import { emailService } from "../services/emailService";
import PaymentMethods from "./PaymentMethods";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";

const CartDrawer = () => {
    const {
        items,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        subtotal,
        tax,
        total,
    } = useCart();

    const { user } = useUser();
    const [isCheckout, setIsCheckout] = useState(false);

    // Reset view when drawer closes
    useEffect(() => {
        if (!isOpen) setIsCheckout(false);
    }, [isOpen]);

    const handlePaymentSuccess = async () => {
        // Generate Unique Order ID
        const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

        // Compile Order Details
        const orderDetails = {
            orderId,
            customerName: user?.name || "Valued Customer",
            customerEmail: user?.email || "customer@example.com",
            items: items,
            subtotal,
            tax,
            total,
            date: new Date().toISOString(), // Changed to ISO for consistency
        };

        // Log Sale
        salesService.addSale(orderDetails, 'Online', 'Online'); // AdminName='Online', Method='Online'

        // Send Email (Mock)
        emailService.sendOrderEmails(orderDetails);

        alert(`Order #${orderId} confirmed! Check your email.`);

        clearCart();
        setIsOpen(false);
        setIsCheckout(false);
    };

    const handlePaymentError = () => {
        alert("Payment Failed. Please try again.");
    };

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-drawer animate-slide-in">
                <div className="cart-header">
                    <h2>
                        <ShoppingBag className="inline-block mr-2" size={24} />
                        {isCheckout ? "Checkout" : "Your Cart"}
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="cart-close-btn">
                        <X size={24} />
                    </button>
                </div>

                <p className="cart-desc">
                    {isCheckout
                        ? "Choose your preferred payment method."
                        : items.length === 0
                            ? "Your cart is currently empty."
                            : "Review your selections before checkout."
                    }
                </p>

                <div className="cart-content">
                    {items.length > 0 ? (
                        <>
                            {!isCheckout ? (
                                // LIST VIEW
                                <div className="cart-items-list">
                                    {items.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-img">
                                                <img src={item.image || item.img} alt={item.name} />
                                            </div>
                                            <div className="cart-item-details">
                                                <div className="cart-item-top">
                                                    <h4>{item.name}</h4>
                                                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="cart-item-bottom">
                                                    <div className="quantity-controls">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                                    </div>
                                                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // CHECKOUT VIEW
                                <div className="checkout-view">
                                    <div className="order-summary">
                                        <h4>Order Summary</h4>
                                        <div className="summary-row">
                                            <span>Items ({items.reduce((a, c) => a + c.quantity, 0)})</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        {/* Tax hidden for tax-free site
                                        <div className="summary-row">
                                            <span>Tax (12.5%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        */}
                                        <div className="summary-row total">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <PaymentMethods
                                        amount={total}
                                        onSuccess={handlePaymentSuccess}
                                        onError={handlePaymentError}
                                    />
                                </div>
                            )}

                            {/* Footer Actions */}
                            {!isCheckout && (
                                <div className="cart-footer">
                                    <div className="cart-totals">
                                        <div className="summary-row">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-row total">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-full" onClick={() => setIsCheckout(true)}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}

                            {isCheckout && (
                                <button className="btn btn-outline w-full mt-4" onClick={() => setIsCheckout(false)}>
                                    Back to Cart
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="empty-cart-state">
                            <div className="empty-icon">
                                <ShoppingBag size={48} />
                            </div>
                            <h3>Your cart is empty</h3>
                            <button className="btn btn-secondary mt-4" onClick={() => setIsOpen(false)}>Start Shopping</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;

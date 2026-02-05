
import React, { useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';

const PaymentMethods = ({ amount, onSuccess, onError, disabled }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState("card");

    // Mock Payment Function
    const handlePayment = async (method) => {
        setIsProcessing(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate Success/Fail (90% success rate for demo)
        const isSuccess = Math.random() > 0.1;

        setIsProcessing(false);

        if (isSuccess) {
            onSuccess();
        } else {
            onError();
        }
    };

    return (
        <div className="payment-methods">
            <div className="secure-badge">
                <ShieldCheck size={18} className="text-green-600" />
                <span>Payments are secure and encrypted</span>
            </div>

            <div className="payment-tabs">
                <button
                    className={`payment-tab-btn ${activeTab === 'card' ? 'active' : ''}`}
                    onClick={() => setActiveTab('card')}
                >
                    Card
                </button>
                <button
                    className={`payment-tab-btn ${activeTab === 'paypal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('paypal')}
                >
                    PayPal
                </button>
            </div>

            <div className="payment-content">
                {activeTab === 'card' && (
                    <div className="card-form animate-fade-in">
                        <div className="form-group">
                            <label>Card Number</label>
                            <div className="input-with-icon">
                                <CreditCard size={16} className="input-icon" />
                                <input
                                    placeholder="0000 0000 0000 0000"
                                    disabled={isProcessing}
                                    maxLength={19}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input placeholder="MM/YY" disabled={isProcessing} maxLength={5} className="input-field" />
                            </div>
                            <div className="form-group">
                                <label>CVC</label>
                                <input placeholder="123" disabled={isProcessing} maxLength={3} className="input-field" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Cardholder Name</label>
                            <input placeholder="John Doe" disabled={isProcessing} className="input-field" />
                        </div>

                        <button
                            className="btn btn-primary w-full mt-4"
                            onClick={() => handlePayment("stripe")}
                            disabled={disabled || isProcessing}
                        >
                            {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                        </button>

                        <p className="payment-note">* Demo Only. No actual charge.</p>
                    </div>
                )}

                {activeTab === 'paypal' && (
                    <div className="paypal-form animate-fade-in text-center">
                        <p className="mb-4 text-muted">You will be redirected to PayPal securely.</p>
                        <button
                            className="btn w-full paypal-btn"
                            onClick={() => handlePayment("paypal")}
                            disabled={disabled || isProcessing}
                        >
                            {isProcessing ? 'Connecting...' : <span className="font-bold italic"><span className="text-blue-900">Pay</span><span className="text-blue-500">Pal</span></span>}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentMethods;

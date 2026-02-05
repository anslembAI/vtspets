export const emailService = {
    sendOrderEmails: (orderData) => {
        console.log("Mock Email Sent:", orderData);
        // In a real app, this would call an API (SendGrid, AWS SES, etc.)
        return Promise.resolve(true);
    }
};

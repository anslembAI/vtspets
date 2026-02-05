const STORAGE_KEY = 'vts_sales_logs';

export const salesService = {
    init: () => {
        if (!localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    },

    getAllSales: () => {
        salesService.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },

    addSale: (saleData, adminName, method) => {
        const sales = salesService.getAllSales();
        const newSale = {
            ...saleData,
            processedBy: adminName,
            paymentMethod: method,
            timestamp: new Date().toISOString()
        };
        sales.unshift(newSale);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    },

    getSalesStats: () => {
        const sales = salesService.getAllSales();
        const activeSales = sales.filter(s => s.status !== 'Refunded');

        const totalRevenue = activeSales.reduce((sum, s) => sum + s.total, 0);
        const totalOrders = activeSales.length;

        // Group by date for chart
        const chartMap = {};
        activeSales.forEach(s => {
            const date = s.timestamp.split('T')[0];
            if (!chartMap[date]) chartMap[date] = 0;
            chartMap[date] += s.total;
        });

        const chartData = Object.keys(chartMap).map(date => ({
            date,
            amount: chartMap[date]
        })).sort((a, b) => new Date(a.date) - new Date(b.date));

        return { totalRevenue, totalOrders, chartData };
    },

    refundSale: (orderId) => {
        const sales = salesService.getAllSales();
        const idx = sales.findIndex(s => s.orderId === orderId);
        if (idx !== -1) {
            sales[idx].status = 'Refunded';
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
            return sales[idx];
        }
    }
};

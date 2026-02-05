export const inventoryService = {
    getInventory: () => {
        const stored = localStorage.getItem('vts_inventory');
        if (stored) return JSON.parse(stored);

        // Default Inventory
        const defaultInv = [
            { id: '1', name: 'Premium Collar', price: 24.00, stock: 15, category: 'Accessories' },
            { id: '2', name: 'Portable Carrier', price: 85.00, stock: 5, category: 'Accessories' },
            { id: '3', name: 'Ceramic Bowl', price: 15.00, stock: 30, category: 'Feeding' },
            { id: '4', name: 'Chew Toy', price: 12.00, stock: 50, category: 'Toys' }
        ];
        localStorage.setItem('vts_inventory', JSON.stringify(defaultInv));
        return defaultInv;
    },

    addItem: (item) => {
        const items = inventoryService.getInventory();
        const newItem = { ...item, id: Date.now().toString() };
        items.push(newItem);
        localStorage.setItem('vts_inventory', JSON.stringify(items));
        return newItem;
    },

    deleteItem: (id) => {
        let items = inventoryService.getInventory();
        items = items.filter(i => i.id !== id);
        localStorage.setItem('vts_inventory', JSON.stringify(items));
    }
};

export const salesService = {
    getStats: () => {
        return {
            totalRevenue: 12450.00,
            totalOrders: 156,
            pendingOrders: 3
        };
    }
};

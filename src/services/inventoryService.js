const STORAGE_KEY = 'vts_inventory';

const DEFAULT_INVENTORY = [
    { id: '1', name: 'Premium Collar', price: 24.00, stock: 15, category: 'Accessories' },
    { id: '2', name: 'Portable Carrier', price: 85.00, stock: 5, category: 'Accessories' },
    { id: '3', name: 'Ceramic Bowl', price: 15.00, stock: 30, category: 'Feeding' },
    { id: '4', name: 'Chew Toy', price: 12.00, stock: 50, category: 'Toys' },
    { id: '5', name: 'Basic Groom', price: 49.00, stock: 999, category: 'Service' },
    { id: '6', name: 'Premium Spa', price: 89.00, stock: 999, category: 'Service' }
];

export const inventoryService = {
    init: () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INVENTORY));
        }
    },

    getInventory: () => {
        inventoryService.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },

    addItem: (item) => {
        const items = inventoryService.getInventory();
        const newItem = { ...item, id: Date.now().toString() };
        items.push(newItem);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return newItem;
    },

    deleteItem: (id) => {
        let items = inventoryService.getInventory();
        items = items.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    },

    updateStock: (id, change) => {
        const items = inventoryService.getInventory();
        const idx = items.findIndex(i => i.id === id);
        if (idx !== -1) {
            if (items[idx].category !== 'Service') { // Services are unlimited
                items[idx].stock = Math.max(0, parseInt(items[idx].stock) + change);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }
};

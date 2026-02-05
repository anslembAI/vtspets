const STORAGE_KEYS = {
    INVOICES: 'vts_invoices',
    BANKS: 'vts_bank_accounts'
};

export const invoiceService = {
    init: () => {
        if (!localStorage.getItem(STORAGE_KEYS.INVOICES)) localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify([]));
        if (!localStorage.getItem(STORAGE_KEYS.BANKS)) localStorage.setItem(STORAGE_KEYS.BANKS, JSON.stringify([]));
    },

    getInvoices: () => {
        invoiceService.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.INVOICES));
    },

    createInvoice: (invoiceData) => {
        const invoices = invoiceService.getInvoices();
        const newInvoice = {
            ...invoiceData,
            id: 'INV-' + Math.floor(1000 + Math.random() * 9000),
            createdAt: new Date().toISOString()
        };
        invoices.unshift(newInvoice);
        localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
        return newInvoice;
    },

    deleteInvoice: (id) => {
        let invoices = invoiceService.getInvoices();
        invoices = invoices.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    },

    // Bank Accounts
    getBankAccounts: () => {
        invoiceService.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.BANKS));
    },

    addBankAccount: (bankData) => {
        const banks = invoiceService.getBankAccounts();
        const newBank = { ...bankData, id: 'bk-' + Date.now() };
        banks.push(newBank);
        localStorage.setItem(STORAGE_KEYS.BANKS, JSON.stringify(banks));
    },

    deleteBankAccount: (id) => {
        let banks = invoiceService.getBankAccounts();
        banks = banks.filter(b => b.id !== id);
        localStorage.setItem(STORAGE_KEYS.BANKS, JSON.stringify(banks));
    }
};

import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Users, FileText, Banknote, Settings,
    Home, Plus, Trash2, Download, CreditCard, UserPlus
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { authService } from '../services/authService';
import { invoiceService } from '../services/invoiceService';
import { inventoryService } from '../services/inventoryService';
import { salesService } from '../services/salesService';
import { emailService } from '../services/emailService';

const Admin = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [usersList, setUsersList] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [salesLogs, setSalesLogs] = useState([]);
    const [salesStats, setSalesStats] = useState({ chartData: [], totalRevenue: 0, totalOrders: 0 });
    const [bankAccounts, setBankAccounts] = useState([]);

    // Modals / Forms State
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [newInvoice, setNewInvoice] = useState({
        userId: "",
        currency: "TTD",
        notes: "",
        bankAccountId: "",
        status: "Draft",
        paymentMethod: "",
        taxApplied: false,
        cashTendered: 0, // NEW: For POS
        items: []
    });

    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [newBank, setNewBank] = useState({ bankName: "", accountNumber: "", accountName: "", accountType: "Checking" });

    // Inventory Form
    const [newItem, setNewItem] = useState({ name: '', price: '', stock: '', category: '' });

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setUsersList(authService.getAllUsers());
        setInventory(inventoryService.getInventory());
        setInvoices(invoiceService.getInvoices());
        setBankAccounts(invoiceService.getBankAccounts());
        setSalesLogs(salesService.getAllSales());
        setSalesStats(salesService.getSalesStats());
    };

    // --- User Logic ---
    const handleAddUser = (e) => {
        e.preventDefault();
        try {
            authService.addUser(newUser.name, newUser.email, newUser.role);
            setIsUserModalOpen(false);
            setNewUser({ name: "", email: "", role: "user" });
            refreshData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteUser = (email) => {
        if (window.confirm('Delete user?')) {
            authService.deleteUser(email);
            refreshData();
        }
    };

    const handleUpdateUserRole = (email, newRole) => {
        authService.updateUserRole(email, newRole);
        refreshData();
    };

    // --- Inventory Logic ---
    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) return;
        inventoryService.addItem({
            name: newItem.name,
            price: parseFloat(newItem.price),
            stock: parseInt(newItem.stock) || 0,
            category: newItem.category || 'General'
        });
        setNewItem({ name: '', price: '', stock: '', category: '' });
        refreshData();
    };

    const handleDeleteItem = (id) => {
        if (window.confirm('Delete product?')) {
            inventoryService.deleteItem(id);
            refreshData();
        }
    };

    // --- Invoice Logic ---
    const handleAddInvoiceItem = () => {
        setNewInvoice({
            ...newInvoice,
            items: [...newInvoice.items, { productId: "", description: "New Item", quantity: 1, price: 0 }]
        });
    };

    const handleUpdateInvoiceItem = (index, field, value) => {
        const updatedItems = [...newInvoice.items];
        if (field === 'productId') {
            const product = inventory.find(p => p.id === value);
            if (product) {
                updatedItems[index] = {
                    ...updatedItems[index],
                    productId: value,
                    description: product.name,
                    price: product.price
                };
            }
        } else {
            updatedItems[index] = { ...updatedItems[index], [field]: value };
        }
        setNewInvoice({ ...newInvoice, items: updatedItems });
    };

    const handleRemoveInvoiceItem = (index) => {
        const updated = newInvoice.items.filter((_, i) => i !== index);
        setNewInvoice({ ...newInvoice, items: updated });
    };

    // Calculations
    const calculateSubtotal = () => newInvoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const calculateTax = () => newInvoice.taxApplied ? calculateSubtotal() * 0 : 0; // 0% Tax
    const calculateTotal = () => calculateSubtotal() + calculateTax();
    const calculateChange = () => {
        if (!newInvoice.cashTendered) return 0;
        return newInvoice.cashTendered - calculateTotal();
    };

    const handleCreateInvoice = async () => {
        if (!newInvoice.userId) return alert("Select a user");
        if (newInvoice.items.length === 0) return alert("Add items");

        const selectedUser = usersList.find(u => u.id === newInvoice.userId);
        const selectedBank = bankAccounts.find(b => b.id === newInvoice.bankAccountId);

        const subtotal = calculateSubtotal();
        const tax = calculateTax();
        const total = calculateTotal();

        const invoiceData = {
            ...newInvoice,
            userName: selectedUser?.name || "Unknown",
            userEmail: selectedUser?.email || "Unknown",
            bankDetails: selectedBank
        };

        const createdInv = invoiceService.createInvoice(invoiceData);

        // If Paid, Log Sale
        if (newInvoice.status === 'Paid') {
            salesService.addSale({
                orderId: createdInv.id,
                customerName: selectedUser?.name,
                customerEmail: selectedUser?.email,
                items: newInvoice.items,
                subtotal, tax, total
            }, 'Admin', newInvoice.paymentMethod);

            // Reduce Stock
            newInvoice.items.forEach(item => {
                if (item.productId) inventoryService.updateStock(item.productId, -item.quantity);
            });

            emailService.sendOrderEmails(createdInv);
        }

        setIsInvoiceModalOpen(false);
        setIsInvoiceModalOpen(false);
        setNewInvoice({ userId: "", currency: "TTD", notes: "", bankAccountId: "", status: "Draft", paymentMethod: "", taxApplied: false, cashTendered: 0, items: [] });
        refreshData();
    };

    const handleDownloadPDF = (invoice) => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.setTextColor(217, 108, 50); // Primary Color
        doc.text("VTS PETS", 15, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("123 Pet Street, Pawsome City", 15, 26);
        doc.text("admin@vtspets.com | +1 (555) 123-4567", 15, 31);

        doc.setFontSize(30);
        doc.setTextColor(200);
        doc.text("INVOICE", 140, 25);

        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.text(`Invoice #: ${invoice.id}`, 140, 35);
        doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 140, 40);
        doc.text(`Status: ${invoice.status.toUpperCase()}`, 140, 45);

        doc.setFontSize(11);
        doc.text("Bill To:", 15, 55);
        doc.setFontSize(10);
        doc.text(invoice.userName, 15, 62);
        doc.text(invoice.userEmail, 15, 67);

        const tableBody = invoice.items.map(item => [
            item.description,
            item.quantity,
            `$${item.price.toFixed(2)}`,
            `$${(item.quantity * item.price).toFixed(2)}`
        ]);

        const totalAmt = invoice.items.reduce((sum, i) => sum + (i.quantity * i.price), 0);
        const taxAmt = invoice.taxApplied ? totalAmt * 0 : 0;

        autoTable(doc, {
            startY: 75,
            head: [['Description', 'Qty', `Price (${invoice.currency})`, 'Total']],
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: [217, 108, 50] }
        });

        let finalY = (doc).lastAutoTable.finalY + 15;

        // Bank Details Section
        if (invoice.bankDetails) {
            doc.setFillColor(245, 245, 245);
            doc.rect(15, finalY, 180, 25, 'F');
            doc.setFontSize(10);
            doc.setTextColor(0);
            doc.text("Payment Info:", 20, finalY + 8);
            doc.text(`${invoice.bankDetails.bankName} - ${invoice.bankDetails.accountNumber}`, 20, finalY + 16);
            finalY += 35;
        }

        doc.text(`Subtotal: $${totalAmt.toFixed(2)}`, 140, finalY);
        // doc.text(`Tax (12.5%): $${taxAmt.toFixed(2)}`, 140, finalY + 5);
        doc.setFontSize(14);
        doc.text(`Total: $${(totalAmt + taxAmt).toFixed(2)}`, 140, finalY + 12);

        if (invoice.notes) {
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text("Notes:", 15, finalY + 12);
            doc.text(invoice.notes, 15, finalY + 17);
        }

        doc.save(`${invoice.id}.pdf`);
    };

    // --- Bank Logic ---
    const handleAddBank = (e) => {
        e.preventDefault();
        invoiceService.addBankAccount(newBank);
        setIsBankModalOpen(false);
        setNewBank({ bankName: "", accountNumber: "", accountName: "", accountType: "Checking" });
        refreshData();
    };

    // --- Refund Logic ---
    const handleRefund = (sale) => {
        if (!window.confirm(`Are you sure you want to refund Order ${sale.orderId}?`)) return;

        // 1. Mark as refunded in Sales Service
        const updatedSale = salesService.refundSale(sale.orderId);
        if (updatedSale) {
            // 2. Restock Inventory
            sale.items.forEach(item => {
                if (item.productId) {
                    inventoryService.updateStock(item.productId, parseInt(item.quantity) || 0);
                }
            });
            alert(`Refund successful for Order ${sale.orderId}`);
            refreshData();
        }
    };

    return (
        <div className="admin-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>
                <nav className="sidebar-nav">
                    <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={18} /> Dashboard</button>
                    <button className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}><Users size={18} /> Users</button>
                    <button className={`nav-item ${activeTab === 'invoices' ? 'active' : ''}`} onClick={() => setActiveTab('invoices')}><FileText size={18} /> Invoices</button>
                    <button className={`nav-item ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}><Banknote size={18} /> Sales Logs</button>
                    <button className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}><Settings size={18} /> Inventory</button>
                    <a href="/" className="nav-item"><Home size={18} /> Back to Site</a>
                </nav>
            </aside>

            <main className="main-content">
                {activeTab === 'dashboard' && (
                    <div className="dashboard-view">
                        <h1>Dashboard</h1>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon revenue"><FileText /></div>
                                <div className="stat-info"><h3>Total Invoices</h3><p>{invoices.length}</p></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon orders"><Users /></div>
                                <div className="stat-info"><h3>Users</h3><p>{usersList.length}</p></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon revenue"><Banknote /></div>
                                <div className="stat-info"><h3>Revenue</h3><p className="text-green-600">${salesStats.totalRevenue.toFixed(2)}</p></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon orders"><CreditCard /></div>
                                <div className="stat-info"><h3>Orders</h3><p>{salesStats.totalOrders}</p></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="users-view">
                        <div className="view-header">
                            <h1>User Management</h1>
                            <button className="btn btn-primary" onClick={() => setIsUserModalOpen(true)}><UserPlus size={16} /> Add User</button>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {usersList.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleUpdateUserRole(u.email, e.target.value)}
                                                    className="p-1 border rounded bg-transparent"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                            <td><button onClick={() => handleDeleteUser(u.email)} className="icon-btn delete-btn"><Trash2 size={16} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {isUserModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Add User</h3>
                                    <form onSubmit={handleAddUser}>
                                        <input placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required className="input-field mb-2" />
                                        <input placeholder="Email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required className="input-field mb-2" />
                                        <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className="input-field mb-2">
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <div className="modal-actions">
                                            <button type="button" onClick={() => setIsUserModalOpen(false)} className="btn btn-outline">Cancel</button>
                                            <button type="submit" className="btn btn-primary">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'invoices' && (
                    <div className="invoices-view">
                        <div className="view-header">
                            <h1>Invoices</h1>
                            <div className="flex gap-2">
                                <button className="btn btn-secondary" onClick={() => setIsBankModalOpen(true)}>+ Bank</button>
                                <button className="btn btn-primary" onClick={() => setIsInvoiceModalOpen(true)}><Plus size={16} /> Create Invoice</button>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {invoices.map(inv => (
                                        <tr key={inv.id}>
                                            <td>{inv.id}</td>
                                            <td>{inv.userName}</td>
                                            <td>${(inv.items.reduce((s, i) => s + (i.quantity * i.price), 0) * (inv.taxApplied ? 1 : 1)).toFixed(2)}</td>
                                            <td>{inv.status}</td>
                                            <td>
                                                <button onClick={() => handleDownloadPDF(inv)} className="icon-btn"><Download size={16} /></button>
                                                <button onClick={() => { invoiceService.deleteInvoice(inv.id); refreshData(); }} className="icon-btn delete-btn"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Invoice Modal */}
                        {isInvoiceModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content large-modal">
                                    <h3>Create Invoice</h3>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-sm font-semibold">Customer</label>
                                            <select value={newInvoice.userId} onChange={e => setNewInvoice({ ...newInvoice, userId: e.target.value })} className="input-field">
                                                <option value="">Select User</option>
                                                {usersList.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold">Bank Info</label>
                                            <select value={newInvoice.bankAccountId} onChange={e => setNewInvoice({ ...newInvoice, bankAccountId: e.target.value })} className="input-field">
                                                <option value="">None / Default</option>
                                                {bankAccounts.map(b => <option key={b.id} value={b.id}>{b.bankName} - {b.accountNumber}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-sm font-semibold">Status</label>
                                            <select value={newInvoice.status} onChange={e => setNewInvoice({ ...newInvoice, status: e.target.value })} className="input-field">
                                                <option value="Draft">Draft</option>
                                                <option value="Sent">Sent</option>
                                                <option value="Paid">Paid</option>
                                            </select>
                                        </div>
                                        {newInvoice.status === 'Paid' && (
                                            <div>
                                                <label className="text-sm font-semibold">Method</label>
                                                <select value={newInvoice.paymentMethod} onChange={e => setNewInvoice({ ...newInvoice, paymentMethod: e.target.value })} className="input-field">
                                                    <option value="">Select Method</option>
                                                    <option value="Cash">Cash</option>
                                                    <option value="Card">Card</option>
                                                    <option value="Online">Online</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <div className="items-section mb-4">
                                        <h4 className="mb-2">Order Items</h4>
                                        {newInvoice.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-2 mb-2 items-center">
                                                <select style={{ flex: 2 }} value={item.productId || 'custom'} onChange={e => handleUpdateInvoiceItem(idx, 'productId', e.target.value)} className="input-field">
                                                    <option value="custom">Custom Item</option>
                                                    {inventory.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                                                </select>
                                                <input style={{ flex: 2 }} value={item.description} onChange={e => handleUpdateInvoiceItem(idx, 'description', e.target.value)} placeholder="Desc" className="input-field" />
                                                <input style={{ width: '80px' }} type="number" value={item.quantity} onChange={e => handleUpdateInvoiceItem(idx, 'quantity', e.target.value)} placeholder="Qty" className="input-field" />
                                                <input style={{ width: '80px' }} type="number" value={item.price} onChange={e => handleUpdateInvoiceItem(idx, 'price', parseFloat(e.target.value))} placeholder="Price" className="input-field" />
                                                <button onClick={() => handleRemoveInvoiceItem(idx)} className="delete-btn"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                        <button onClick={handleAddInvoiceItem} className="btn btn-outline btn-sm">+ Add Item</button>
                                    </div>

                                    <div className="totals-section border-t pt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-2" style={{ display: 'none' }}>
                                                <input type="checkbox" checked={newInvoice.taxApplied} onChange={e => setNewInvoice({ ...newInvoice, taxApplied: e.target.checked })} />
                                                <label>Apply Tax (0%)</label>
                                            </div>
                                            <div className="text-right">
                                                <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                                                <p>Tax: ${calculateTax().toFixed(2)}</p>
                                                <p className="font-bold text-lg">Total: ${calculateTotal().toFixed(2)}</p>
                                            </div>
                                        </div>

                                        {/* CASH TENDERED DISPLAY */}
                                        {newInvoice.status === 'Paid' && newInvoice.paymentMethod === 'Cash' && (
                                            <div className="flex justify-end items-center gap-4 mt-2 bg-yellow-50 p-2 rounded">
                                                <label className="font-semibold">Cash Tendered:</label>
                                                <input
                                                    type="number"
                                                    className="input-field w-24 text-right"
                                                    value={newInvoice.cashTendered}
                                                    onChange={e => setNewInvoice({ ...newInvoice, cashTendered: parseFloat(e.target.value) })}
                                                />
                                                <div className="text-green-600 font-bold ml-4">
                                                    Change: ${calculateChange().toFixed(2)}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="modal-actions mt-4">
                                        <button onClick={() => setIsInvoiceModalOpen(false)} className="btn btn-outline">Cancel</button>
                                        <button onClick={handleCreateInvoice} className="btn btn-primary">
                                            {newInvoice.status === 'Paid' ? 'Complete Sale' : 'Save Invoice'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bank Modal */}
                        {isBankModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Add Bank Account</h3>
                                    <form onSubmit={handleAddBank}>
                                        <input placeholder="Bank Name" value={newBank.bankName} onChange={e => setNewBank({ ...newBank, bankName: e.target.value })} className="input-field mb-2" required />
                                        <input placeholder="Account Number" value={newBank.accountNumber} onChange={e => setNewBank({ ...newBank, accountNumber: e.target.value })} className="input-field mb-2" required />
                                        <input placeholder="Account Name" value={newBank.accountName} onChange={e => setNewBank({ ...newBank, accountName: e.target.value })} className="input-field" />
                                        <div className="modal-actions">
                                            <button type="button" onClick={() => setIsBankModalOpen(false)} className="btn btn-outline">Cancel</button>
                                            <button type="submit" className="btn btn-primary">Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'sales' && (
                    <div className="sales-view">
                        <h1>Sales Logs</h1>
                        <div className="chart-container" style={{ height: '300px', background: 'white', padding: '1rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesStats.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="amount" fill="#D96C32" name="Revenue" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                                <tbody>
                                    {salesLogs.map(log => (
                                        <tr key={log.orderId} className={log.status === 'Refunded' ? 'opacity-50' : ''}>
                                            <td>{log.orderId}</td>
                                            <td>{new Date(log.timestamp).toLocaleDateString()}</td>
                                            <td>{log.customerName}</td>
                                            <td>${log.total.toFixed(2)}</td>
                                            <td style={{ color: log.status === 'Refunded' ? 'red' : 'green' }}>
                                                {log.status || 'Paid'}
                                            </td>
                                            <td>
                                                {log.status !== 'Refunded' && (
                                                    <button onClick={() => handleRefund(log)} className="btn btn-outline btn-sm text-red-500 border-red-200">
                                                        Refund
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Inventory Tab (Re-using logic from previous step, but ensuring it fits here) */}
                {activeTab === 'inventory' && (
                    <div className="inventory-view">
                        <div className="view-header">
                            <h1>Inventory</h1>
                        </div>
                        <div className="add-item-form">
                            <form onSubmit={handleAddItem} className="form-grid">
                                <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="input-field" />
                                <input placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} className="input-field" />
                                <input placeholder="Stock" value={newItem.stock} onChange={e => setNewItem({ ...newItem, stock: e.target.value })} className="input-field" />
                                <button type="submit" className="btn btn-primary">+ Add</button>
                            </form>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead>
                                <tbody>
                                    {inventory.map(i => (
                                        <tr key={i.id}><td>{i.name}</td><td>${i.price}</td><td>{i.stock}</td><td><button onClick={() => handleDeleteItem(i.id)} className="icon-btn delete-btn"><Trash2 size={16} /></button></td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Admin;

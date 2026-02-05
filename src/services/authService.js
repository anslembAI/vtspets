// Simulating a Database using LocalStorage
const STORAGE_KEYS = {
    USERS: 'vts_users',
    SESSIONS: 'vts_session'
};

// Default Admin User
const DEFAULT_USERS = [
    { id: 'u1', name: 'Admin User', email: 'admin@vtspets.com', role: 'admin', password: 'password123', createdAt: '2025-01-01T10:00:00Z' },
    { id: 'u2', name: 'John Doe', email: 'john@example.com', role: 'user', password: 'password123', createdAt: '2025-02-15T14:30:00Z' }
];

export const authService = {
    // Initialize DB
    init: () => {
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
        }
    },

    getAllUsers: () => {
        authService.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    },

    addUser: (name, email, role = 'user') => {
        const users = authService.getAllUsers();
        if (users.find(u => u.email === email)) throw new Error("User already exists");

        const newUser = {
            id: 'u' + Date.now(),
            name,
            email,
            role,
            password: 'password123', // Default
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return newUser;
    },

    updateUserRole: (email, newRole) => {
        const users = authService.getAllUsers();
        const idx = users.findIndex(u => u.email === email);
        if (idx !== -1) {
            users[idx].role = newRole;
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        }
    },

    deleteUser: (email) => {
        let users = authService.getAllUsers();
        users = users.filter(u => u.email !== email);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
};

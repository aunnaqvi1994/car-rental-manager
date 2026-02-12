// ====================================================
// FIREBASE CONFIGURATION  
// ====================================================
const firebaseConfig = {
    databaseURL: "https://car-rental-manager-8e3e9-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
let database;
try {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    console.log('🔥 Firebase initialized successfully!');
} catch(e) {
    console.error('Firebase initialization failed:', e);
}

// ===================================
// DATA MANAGEMENT
// ===================================
class RentalManager {
    constructor() {
        this.dailyEntries = [];
        this.monthlyExpenses = [];
        this.maintenanceRecords = [];
        this.isInitialized = false;
    }

    // Initialize data - load from Google Sheets or localStorage
    async init() {
        if (!database) {
            console.warn("Firebase not available");
            this.isInitialized = true;
            return;
        }
        try {
            const snapshot = await database.ref("/").once("value");
            const data = snapshot.val() || {};
            this.dailyEntries = data.dailyEntries ? Object.values(data.dailyEntries) : [];
            this.monthlyExpenses = data.monthlyExpenses ? Object.values(data.monthlyExpenses) : [];
            this.maintenanceRecords = data.maintenanceRecords ? Object.values(data.maintenanceRecords) : [];
            this.isInitialized = true;
            console.log("✅ Data loaded from Firebase");
        } catch (error) {
            console.error("Error loading from Firebase:", error);
            this.isInitialized = true;
        }
    }


    // Save data to Firebase
    async saveToFirebase(collection, data) {
        if (!database) return;
        try {
            const dataObj = {};
            data.forEach(item => {
                dataObj[item.id] = item;
            });
            await database.ref(`/${collection}`).set(dataObj);
        } catch (error) {
            console.error(`Error saving to Firebase:`, error);
        }
    }

    // Load data from localStorage
    loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error loading ${key}:`, error);
            return null;
        }
    }

    // Save data to localStorage or Google Sheets
    async saveData(key, data) {
        if (USE_GOOGLE_SHEETS && sheetsAPI) {
            // Google Sheets saves happen in the add/delete methods
            return true;
        } else {
            // Save to localStorage
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.error(`Error saving ${key}:`, error);
            }
        }
    }

    // ===================================
    // DAILY ENTRIES
    // ===================================
    // Add new daily entry
    async addDailyEntry(date, earnings, expenses) {
        // Check if entry already exists for this date
        if (this.getDailyEntryByDate(date)) {
            return { success: false, message: 'Entry already exists for this date. Please delete the existing entry first.' };
        }

        const profit = earnings - expenses;
        const ownerShare = profit * 0.5;
        const driverShare = profit * 0.5;

        const entry = {
            id: Date.now(),
            date,
            earnings: parseFloat(earnings),
            expenses: parseFloat(expenses),
            profit,
            ownerShare,
            driverShare
        };

        this.dailyEntries.push(entry);

        if (USE_GOOGLE_SHEETS && sheetsAPI) {
            // Save to Google Sheets
            const sheetData = {
                ID: entry.id,
                Date: entry.date,
                Earnings: entry.earnings,
                Expenses: entry.expenses,
                Profit: entry.profit,
                OwnerShare: entry.ownerShare,
                DriverShare: entry.driverShare
            };
            await sheetsAPI.addData('DailyEntries', sheetData);
        } else {
        await this.saveToFirebase("dailyEntries", this.dailyEntries);
        }
        return { success: true, entry };
    }

    getDailyEntryByDate(date) {
        return this.dailyEntries.find(entry => entry.date === date);
    }

    async deleteDailyEntry(id, password) {
        if (USE_GOOGLE_SHEETS && sheetsAPI) {
            const result = await sheetsAPI.deleteData('DailyEntries', id, password);
            if (result.success) {
                this.dailyEntries = this.dailyEntries.filter(entry => entry.id !== id);
            }
            return result;
        } else {
            this.dailyEntries = this.dailyEntries.filter(entry => entry.id !== id);
        await this.saveToFirebase("dailyEntries", this.dailyEntries);
            return { success: true };
        }
    }

    getAllDailyEntries(sortDescending = true) {
        const sorted = [...this.dailyEntries].sort((a, b) => {
            return sortDescending
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date);
        });
        return sorted;
    }

    getDailyEntriesByMonth(yearMonth) {
        return this.dailyEntries.filter(entry => entry.date.startsWith(yearMonth));
    }

    // ===================================
    // MONTHLY EXPENSES
    // ===================================

    async addMonthlyExpense(name, amount, month) {
        const expense = {
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            month
        };

        this.monthlyExpenses.push(expense);
        await this.saveToFirebase("monthlyExpenses", this.monthlyExpenses);
        return { success: true, expense };
    }

    async deleteMonthlyExpense(id) {
        this.monthlyExpenses = this.monthlyExpenses.filter(exp => exp.id !== id);
        await this.saveToFirebase("monthlyExpenses", this.monthlyExpenses);
    }

    getAllMonthlyExpenses(sortDescending = true) {
        const sorted = [...this.monthlyExpenses].sort((a, b) => {
            return sortDescending
                ? b.month.localeCompare(a.month)
                : a.month.localeCompare(b.month);
        });
        return sorted;
    }

    // ===================================
    // MAINTENANCE
    // ===================================

    async addMaintenanceRecord(date, description, cost) {
        const record = {
            id: Date.now(),
            date,
            description,
            cost: parseFloat(cost)
        };

        this.maintenanceRecords.push(record);
        await this.saveToFirebase("maintenanceRecords", this.maintenanceRecords);
        return { success: true, record };
    }

    async deleteMaintenanceRecord(id) {
        this.maintenanceRecords = this.maintenanceRecords.filter(rec => rec.id !== id);
        await this.saveToFirebase("maintenanceRecords", this.maintenanceRecords);
    }

    getAllMaintenanceRecords(sortDescending = true) {
        const sorted = [...this.maintenanceRecords].sort((a, b) => {
            return sortDescending
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date);
        });
        return sorted;
    }

    getTotalMaintenanceCost() {
        return this.maintenanceRecords.reduce((sum, rec) => sum + rec.cost, 0);
    }

    // ===================================
    // CALCULATIONS & STATS
    // ===================================

    getTodayStats() {
        const today = this.formatDate(new Date());
        const entry = this.getDailyEntryByDate(today);

        if (entry) {
            return {
                earnings: entry.earnings,
                profit: entry.profit,
                ownerShare: entry.ownerShare,
                driverShare: entry.driverShare
            };
        }

        return { earnings: 0, profit: 0, ownerShare: 0, driverShare: 0 };
    }

    getCurrentMonthStats() {
        const now = new Date();
        const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const entries = this.getDailyEntriesByMonth(yearMonth);

        const stats = {
            earnings: 0,
            profit: 0,
            ownerShare: 0,
            driverShare: 0,
            days: entries.length
        };

        entries.forEach(entry => {
            stats.earnings += entry.earnings;
            stats.profit += entry.profit;
            stats.ownerShare += entry.ownerShare;
            stats.driverShare += entry.driverShare;
        });

        return stats;
    }

    // ===================================
    // UTILITY
    // ===================================

    formatDate(date) {
        if (typeof date === 'string') {
            return date;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatCurrency(amount) {
        const formatted = new Intl.NumberFormat('en-PK', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
        return 'Rs ' + formatted;
    }

    formatDateDisplay(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(date);
    }

    formatMonthDisplay(monthString) {
        const [year, month] = monthString.split('-');
        const date = new Date(year, month - 1);
        return new Intl.DateTimeFormat('en-IN', {
            month: 'long',
            year: 'numeric'
        }).format(date);
    }
}

// ===================================
// UI CONTROLLER
// ===================================

class UIController {
    constructor(rentalManager) {
        this.manager = rentalManager;
        this.currentFilter = null;
        this.initializeUI();
        this.attachEventListeners();
        this.updateDashboard();

        // Initial render of all sections with existing data
        this.renderDailyReports();
        this.renderMonthlyExpenses();
        this.renderMaintenanceRecords();
    }

    initializeUI() {
        // Set current date in header
        const now = new Date();
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Set default date inputs to today
        document.getElementById('entryDate').valueAsDate = now;
        document.getElementById('maintenanceDate').valueAsDate = now;

        // Set default month inputs to current month
        const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        document.getElementById('expenseMonth').value = yearMonth;
        document.getElementById('filterMonth').value = yearMonth;
    }

    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Daily Entry Form
        document.getElementById('dailyEntryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.async handleDailyEntrySubmit();
        });

        // Real-time calculation preview
        const earningsInput = document.getElementById('earnings');
        const expensesInput = document.getElementById('expenses');
        [earningsInput, expensesInput].forEach(input => {
            input.addEventListener('input', () => this.updateCalculationPreview());
        });

        // Monthly Expense Form
        document.getElementById('monthlyExpenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.async handleMonthlyExpenseSubmit();
        });

        // Maintenance Form
        document.getElementById('maintenanceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.async handleMaintenanceSubmit();
        });

        // Filter controls
        document.getElementById('filterMonth').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.renderDailyReports();
        });

        document.getElementById('showAllBtn').addEventListener('click', () => {
            this.currentFilter = null;
            document.getElementById('filterMonth').value = '';
            this.renderDailyReports();
        });
    }

    // ===================================
    // TAB SWITCHING
    // ===================================

    switchTab(tabName) {
        // Find the button that was clicked
        const clickedButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);

        // Update active button
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        // Hide all content sections
        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.add('hidden');
        });

        // Show selected section
        document.getElementById(tabName).classList.remove('hidden');

        // Refresh data when switching to specific tabs
        if (tabName === 'dashboard') {
            this.updateDashboard();
        } else if (tabName === 'daily-reports') {
            this.renderDailyReports();
        } else if (tabName === 'monthly-expenses') {
            this.renderMonthlyExpenses();
        } else if (tabName === 'maintenance') {
            this.renderMaintenanceRecords();
        }
    }

    // ===================================
    // DASHBOARD
    // ===================================

    updateDashboard() {
        const todayStats = this.manager.getTodayStats();
        const monthStats = this.manager.getCurrentMonthStats();

        // Today's stats
        document.getElementById('todayEarnings').textContent = this.manager.formatCurrency(todayStats.earnings);
        document.getElementById('todayProfit').textContent = this.manager.formatCurrency(todayStats.profit);
        document.getElementById('todayOwnerShare').textContent = this.manager.formatCurrency(todayStats.ownerShare);
        document.getElementById('todayDriverShare').textContent = this.manager.formatCurrency(todayStats.driverShare);

        // Month's stats
        document.getElementById('monthEarnings').textContent = this.manager.formatCurrency(monthStats.earnings);
        document.getElementById('monthProfit').textContent = this.manager.formatCurrency(monthStats.profit);
        document.getElementById('monthDays').textContent = monthStats.days;
        document.getElementById('monthOwnerShare').textContent = this.manager.formatCurrency(monthStats.ownerShare);
        document.getElementById('monthDriverShare').textContent = this.manager.formatCurrency(monthStats.driverShare);
    }

    // ===================================
    // DAILY ENTRY
    // ===================================

    updateCalculationPreview() {
        const earnings = parseFloat(document.getElementById('earnings').value) || 0;
        const expenses = parseFloat(document.getElementById('expenses').value) || 0;
        const profit = earnings - expenses;
        const share = profit * 0.5;

        document.getElementById('previewProfit').textContent = this.manager.formatCurrency(profit);
        document.getElementById('previewOwnerShare').textContent = this.manager.formatCurrency(share);
        document.getElementById('previewDriverShare').textContent = this.manager.formatCurrency(share);
    }

    async handleDailyEntrySubmit() {
        const date = document.getElementById('entryDate').value;
        const earnings = document.getElementById('earnings').value;
        const expenses = document.getElementById('expenses').value;

        const result = this.manager.addDailyEntry(date, earnings, expenses);

        if (result.success) {
            alert('✅ Daily entry saved successfully!');
            document.getElementById('dailyEntryForm').reset();
            document.getElementById('entryDate').valueAsDate = new Date();
            this.updateCalculationPreview();
            this.updateDashboard();
        } else {
            alert('❌ ' + result.message);
        }
    }

    // ===================================
    // DAILY REPORTS
    // ===================================

    renderDailyReports() {
        const tbody = document.getElementById('reportsTableBody');
        let entries = this.currentFilter
            ? this.manager.getDailyEntriesByMonth(this.currentFilter)
            : this.manager.getAllDailyEntries();

        if (entries.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No entries found.</td></tr>';
            // Clear totals
            document.getElementById('reportTotalOwner').textContent = '0';
            document.getElementById('reportTotalDriver').textContent = '0';
            return;
        }

        // Calculate totals for displayed entries
        let totalOwnerShare = 0;
        let totalDriverShare = 0;
        entries.forEach(entry => {
            totalOwnerShare += entry.ownerShare;
            totalDriverShare += entry.driverShare;
        });

        // Update totals display
        document.getElementById('reportTotalOwner').textContent = this.manager.formatCurrency(totalOwnerShare);
        document.getElementById('reportTotalDriver').textContent = this.manager.formatCurrency(totalDriverShare);

        tbody.innerHTML = entries.map(entry => `
      <tr class="fade-in">
        <td>${this.manager.formatDateDisplay(entry.date)}</td>
        <td class="amount currency">${this.manager.formatCurrency(entry.earnings)}</td>
        <td class="amount currency">${this.manager.formatCurrency(entry.expenses)}</td>
        <td class="amount currency positive">${this.manager.formatCurrency(entry.profit)}</td>
        <td class="amount currency positive">${this.manager.formatCurrency(entry.ownerShare)}</td>
        <td class="amount currency positive">${this.manager.formatCurrency(entry.driverShare)}</td>
        <td class="actions">
          <button class="btn btn-danger btn-sm" onclick="ui.deleteDailyEntry(${entry.id})">🗑️ Delete</button>
        </td>
      </tr>
    `).join('');
    }

    deleteDailyEntry(id) {
        // Password protection for delete operations
        const password = prompt('🔒 Owner Password Required\n\nEnter password to delete this entry:');

        // Simple password check (you can change '1234' to your preferred password)
        if (password !== '1234') {
            alert('❌ Incorrect password. Only the owner can delete entries.');
            return;
        }

        if (confirm('Are you sure you want to delete this entry?')) {
            this.manager.deleteDailyEntry(id);
            this.renderDailyReports();
            this.updateDashboard();
            alert('✅ Entry deleted successfully!');
        }
    }

    // ===================================
    // MONTHLY EXPENSES
    // ===================================

    async handleMonthlyExpenseSubmit() {
        const name = document.getElementById('expenseName').value;
        const amount = document.getElementById('expenseAmount').value;
        const month = document.getElementById('expenseMonth').value;

        const result = await this.manager.addMonthlyExpense(name, amount, month);

        if (result.success) {
            alert('✅ Monthly expense added successfully!');
            document.getElementById('monthlyExpenseForm').reset();
            const now = new Date();
            const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            document.getElementById('expenseMonth').value = yearMonth;
            this.renderMonthlyExpenses();
        }
    }

    renderMonthlyExpenses() {
        const tbody = document.getElementById('monthlyExpensesTableBody');
        const expenses = this.manager.getAllMonthlyExpenses();

        if (expenses.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No monthly expenses added yet.</td></tr>';
            return;
        }

        tbody.innerHTML = expenses.map(expense => `
      <tr class="fade-in">
        <td>${this.manager.formatMonthDisplay(expense.month)}</td>
        <td>${expense.name}</td>
        <td class="amount currency">${this.manager.formatCurrency(expense.amount)}</td>
        <td class="actions">
          <button class="btn btn-danger btn-sm" onclick="ui.async deleteMonthlyExpense(${expense.id})">🗑️ Delete</button>
        </td>
      </tr>
    `).join('');
    }

    async deleteMonthlyExpense(id) {
        const password = prompt('🔒 Owner Password Required\n\nEnter password to delete this expense:');

        if (password !== '1234') {
            alert('❌ Incorrect password. Only the owner can delete expenses.');
            return;
        }

        if (confirm('Are you sure you want to delete this expense?')) {
            await this.manager.deleteMonthlyExpense(id);
            this.renderMonthlyExpenses();
            alert('✅ Expense deleted successfully!');
        }
    }

    // ===================================
    // MAINTENANCE
    // ===================================

    async handleMaintenanceSubmit() {
        const date = document.getElementById('maintenanceDate').value;
        const description = document.getElementById('maintenanceDescription').value;
        const cost = document.getElementById('maintenanceCost').value;

        const result = await this.manager.addMaintenanceRecord(date, description, cost);

        if (result.success) {
            alert('✅ Maintenance record added successfully!');
            document.getElementById('maintenanceForm').reset();
            document.getElementById('maintenanceDate').valueAsDate = new Date();
            this.renderMaintenanceRecords();
        }
    }

    renderMaintenanceRecords() {
        const tbody = document.getElementById('maintenanceTableBody');
        const records = this.manager.getAllMaintenanceRecords();
        const totalCost = this.manager.getTotalMaintenanceCost();

        // Update total cost
        document.getElementById('totalMaintenanceCost').textContent = this.manager.formatCurrency(totalCost);

        if (records.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No maintenance records yet.</td></tr>';
            return;
        }

        tbody.innerHTML = records.map(record => `
      <tr class="fade-in">
        <td>${this.manager.formatDateDisplay(record.date)}</td>
        <td>${record.description}</td>
        <td class="amount currency">${this.manager.formatCurrency(record.cost)}</td>
        <td class="actions">
          <button class="btn btn-danger btn-sm" onclick="ui.async deleteMaintenanceRecord(${record.id})">🗑️ Delete</button>
        </td>
      </tr>
    `).join('');
    }

    async deleteMaintenanceRecord(id) {
        const password = prompt('🔒 Owner Password Required\n\nEnter password to delete this record:');

        if (password !== '1234') {
            alert('❌ Incorrect password. Only the owner can delete maintenance records.');
            return;
        }

        if (confirm('Are you sure you want to delete this maintenance record?')) {
            await this.manager.deleteMaintenanceRecord(id);
            this.renderMaintenanceRecords();
            alert('✅ Maintenance record deleted successfully!');
        }
    }
}

// ===================================
// INITIALIZE APPLICATION
// ===================================

let manager;
let ui;

document.addEventListener('DOMContentLoaded', async () => {
    manager = new RentalManager();

    // Initialize data from Google Sheets or localStorage
    await manager.init();

    ui = new UIController(manager);

    console.log('🚗 Car Rental Manager initialized successfully!');
    console.log(USE_GOOGLE_SHEETS ? '☁️ Using Google Sheets for data storage' : '💾 Using localStorage for data storage');
});

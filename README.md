# 🚗 Car Rental Manager

A modern, beautiful web application to manage your car rental business with automatic profit splitting, daily logging, and comprehensive expense tracking.

## ✨ Features

### 📊 Dashboard
- Real-time overview of today's earnings and profit
- Monthly summary with total earnings and profit
- Automatic 50/50 profit split between owner and driver
- Beautiful visual stats with gradient design

### ➕ Daily Entry Logging
- Add daily earnings and expenses
- **Select any date** - perfect for logging missing days
- Real-time profit calculation preview
- Automatic 50/50 split calculation
- Duplicate date prevention

### 📅 Daily Reports
- Comprehensive table view of all entries
- Filter by month or view all
- Edit and delete entries
- See earnings, expenses, profit, and shares at a glance

### 💰 Monthly Expenses
- Track recurring monthly costs (oil changes, insurance, etc.)
- Add, view, and delete monthly expenses
- Organized by month for easy tracking

### 🔧 Maintenance Tracking
- Log all maintenance and repair costs
- Date, description, and cost tracking
- Total maintenance cost calculation
- Complete history view

## 🚀 Quick Start

### Local Testing

1. **Clone or download** this project
2. Open `index.html` in your web browser
3. Start adding your daily entries!

That's it! The app runs entirely in your browser with no installation needed.

### Deploy to GitHub Pages (Free Hosting)

Both you and your driver can access the app from anywhere:

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Create a new repository**
   - Click the "+" button → "New repository"
   - Name it `car-rental-manager`
   - Make it **Public**
   - Click "Create repository"

3. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop all files from this project
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your site

5. **Access your app**
   - Your live URL will be: `https://YOUR-USERNAME.github.io/car-rental-manager/`
   - Share this URL with your driver
   - Both can bookmark and access from any device!

## 📱 Mobile Friendly

The app is fully responsive and works perfectly on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers

## 💾 Data Storage

### Important Notes

- **Data is stored locally** in your browser's localStorage
- Each device has its own data (not synced automatically)
- Data persists even after closing the browser

### Recommended Usage

Choose one of these options:

**Option 1 (Recommended)**: Use one shared device
- Keep a tablet or phone at your office
- Both you and driver enter data on the same device

**Option 2**: One person enters, both view
- One person responsible for daily entries
- Both can view the hosted site

**Option 3** (Future upgrade): Add real-time sync
- Contact developer to add Firebase integration
- Enables real-time syncing across all devices

## 🎨 Design

- **Modern dark theme** with premium gradients
- **Glass morphism** effects with blur
- **Smooth animations** and hover effects
- **Professional color palette** (purple/blue gradients)
- **Indian Rupee (₹)** currency formatting

## 🧮 Profit Calculation

```
Total Profit = Total Earnings - Daily Expenses
Your Share = Total Profit × 50%
Driver Share = Total Profit × 50%
```

**Example:**
- Earnings: ₹4,000
- Expenses: ₹1,000
- **Profit: ₹3,000**
- Your Share: ₹1,500
- Driver Share: ₹1,500

## 🔒 Privacy

- No data is sent to any server
- All data stays in your browser
- No tracking or analytics
- Completely private and secure

## 🆘 Support

### Common Issues

**Q: I don't see my data after refreshing**
- Make sure you're using the same browser and device
- Check that cookies/localStorage are not disabled

**Q: Can my driver see the data I enter?**
- Only if using the same device or if you share the device with them
- For separate devices, consider the Firebase upgrade option

**Q: How do I backup my data?**
- Currently, data is only in browser localStorage
- Future version will include export to CSV/Excel

### Need Help?

For questions or issues, contact your developer or create an issue on GitHub.

## 📄 License

Free to use for your personal car rental business.

---

**Built with ❤️ for car rental owners and drivers**

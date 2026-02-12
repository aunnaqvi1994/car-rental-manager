# Google Sheets Integration - Complete Setup Guide

## 🎯 What This Will Do
After setup, both you and your driver will see the same data on any device!

---

## Part 1: Create Google Sheet (5 minutes)

### Step 1: Create the Sheet
1. Go to https://sheets.google.com
2. Click **"+ Blank"** (the colorful plus icon)
3. Click on "Untitled spreadsheet" at top
4. Rename it to: **"Car Rental Data"**

### Step 2: Create 3 Tabs
You need to create 3 separate sheets (tabs at the bottom):

**Tab 1: DailyEntries**
1. The first sheet is already there - rename it from "Sheet1" to **"DailyEntries"**
2. In **Row 1**, add these column headers:
```
A1: ID
B1: Date
C1: Earnings
D1: Expenses
E1: Profit
F1: OwnerShare
G1: DriverShare
```

**Tab 2: MonthlyExpenses**
1. Click the **"+"** button at bottom left to add new sheet
2. Rename it to **"MonthlyExpenses"**
3. In **Row 1**, add these headers:
```
A1: ID
B1: Month
C1: Name
D1: Amount
```

**Tab 3: Maintenance**
1. Click **"+"** again to add another sheet
2. Rename it to **"Maintenance"**
3. In **Row 1**, add these headers:
```
A1: ID
B1: Date
C1: Description
D1: Cost
```

---

## Part 2: Add Apps Script (10 minutes)

### Step 3: Open Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a new tab with some code
3. **DELETE** all the existing code in the editor

### Step 4: Copy the Script
1. Open the file: `GoogleAppsScript.gs` (in your project folder)
2. **Copy ALL the code** from that file
3. **Paste it** into the Apps Script editor
4. Click the **💾 Save** icon
5. Name the project: **"Car Rental API"**

### Step 5: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **"Web app"**
4. Fill in these settings:
   - **Description**: "Car Rental Manager API"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to Car Rental API (unsafe)** → **Allow**

### Step 6: Copy the Web App URL
After deployment, you'll see a URL like:
```
https://script.google.com/macros/s/AKfycby...some_long_code.../exec
```

**⚠️ IMPORTANT: Copy this entire URL!** You'll need it in the next step.

---

## Part 3: Connect App to Google Sheets (5 minutes)

### Step 7: Update Your App
1. Open file: `/home/active/.gemini/antigravity/scratch/car-rental-manager/app.js`
2. Find **Line 1** (the very first line)
3. Add this code at the very beginning:

```javascript
// GOOGLE SHEETS CONFIGURATION
const USE_GOOGLE_SHEETS = true;
const GOOGLE_SHEETS_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

4. Replace `'PASTE_YOUR_WEB_APP_URL_HERE'` with the URL you copied in Step 6

### Step 8: Deploy the Updated App
Run these commands:
```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git add .
git commit -m "Connected to Google Sheets"
git push origin main
```

Wait 2 minutes, then refresh your app!

---

## ✅ Testing

1. Open your app: https://aunnaqvi1994.github.io/car-rental-manager/
2. Add a daily entry
3. Check your Google Sheet - the data should appear!
4. Open the app on another device - you should see the same data!

---

## 🎉 What You'll Have

✅ Real-time data sync across all devices
✅ Both you and driver see the same data
✅ Automatic backup on Google Drive
✅ Can view/edit data directly in Google Sheets if needed

---

## 🆘 Troubleshooting

**Problem: "Script not found" error**
- Make sure you deployed the Apps Script as "Web app"
- Check that "Who has access" is set to "Anyone"

**Problem: Data not appearing in sheet**
- Check the console (F12 in browser) for errors
- Make sure the Web App URL is correct in app.js
- Verify sheet tab names are exactly: DailyEntries, MonthlyExpenses, Maintenance

**Problem: Still seeing localStorage data**
- Clear browser cache (Ctrl+Shift+R)
- Check if `USE_GOOGLE_SHEETS = true` in app.js

---

**Ready to start? Let me know which step you're on and I'll help you through it!**

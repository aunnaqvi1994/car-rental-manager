# Google Sheets Integration - Complete Setup Guide

## 🎯 What This Does
Replaces localStorage with Google Sheets so **both you and your driver can access the same data from any device, anywhere**.

---

## 📋 Step-by-Step Setup (20 minutes)

### Step 1: Create Your Google Sheet (2 minutes)

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **"+ Blank"** to create a new sheet
3. Name it: **"Car Rental Data"**

4. Create **3 sheets** (tabs at the bottom):
   - Rename "Sheet1" to **"DailyEntries"**
   - Click **"+"** to add new sheet, name it **"MonthlyExpenses"**
   - Click **"+"** to add new sheet, name it **"Maintenance"**

5. **Set up column headers** in each sheet:

**DailyEntries** sheet (columns A-G):
```
ID | Date | Earnings | Expenses | Profit | OwnerShare | DriverShare
```

**MonthlyExpenses** sheet (columns A-D):
```
ID | Month | Name | Amount
```

**Maintenance** sheet (columns A-D):
```
ID | Date | Description | Cost
```

---

### Step 2: Create Apps Script (10 minutes)

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. **Copy and paste** the complete script (I'll provide it separately)
4. Click **Save** (disk icon)
5. Name the project: **"Car Rental API"**

---

### Step 3: Deploy as Web App (3 minutes)

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** ⚙️ → Select **"Web app"**
3. **Description**: "Car Rental Manager API"
4. **Execute as**: **Me** (your Google account)
5. **Who has access**: **Anyone**
6. Click **Deploy**
7. **Authorize** the app (click "Allow")
8. **COPY THE WEB APP URL** - you'll need this!
   - It looks like: `https://script.google.com/macros/s/ABC...XYZ/exec`

---

### Step 4: Update Your App (2 minutes)

1. Open `app.js` in your car rental manager
2. Find line 1 and add this at the very top:
```javascript
const GOOGLE_SHEETS_URL = 'YOUR_WEB_APP_URL_HERE';
```
3. Replace `'YOUR_WEB_APP_URL_HERE'` with the URL you copied

---

### Step 5: Test It! (3 minutes)

1. Open `index.html` in your browser
2. Try adding a daily entry
3. Check your Google Sheet - the data should appear!
4. Open the same URL on your mobile - you should see the same data!

---

## 🔐 Sharing with Your Driver

### Option 1: Just Share the App URL
- Deploy your app to Netlify/GitHub Pages
- Share the URL with your driver
- Both of you will see the same data automatically!

### Option 2: Also Share the Sheet (Optional Backup)
1. In Google Sheets, click **Share** button
2. Add your driver's email
3. Give them **"Viewer"** access (they don't need to edit the sheet directly)

---

## 🚨 Important Notes

**Data Privacy:**
- The Web App is set to "Anyone" can access, which means anyone with the URL can read/write data
- The Google Sheet itself can be private (only you can edit)
- Password protection for deletes is still active

**Backup:**
- Your data is automatically backed up on Google Drive
- You can download the sheet anytime as Excel/CSV

**Costs:**
- Completely FREE (Google Apps Script quota is very generous)

---

## 🎉 Benefits

✅ Real-time sync - changes appear instantly on all devices
✅ Access from anywhere - mobile, computer, any browser  
✅ Both owner and driver see same data
✅ Automatic backups on Google Drive
✅ No database setup or hosting costs
✅ Can view/edit data directly in Google Sheets if needed

---

## 📱 Using on Mobile

After deployment:
1. Open the app URL on your phone
2. Add to home screen
3. Works like a native app!
4. All data syncs with your desktop automatically

---

**Next:** I'll provide the complete Apps Script code in a separate file!

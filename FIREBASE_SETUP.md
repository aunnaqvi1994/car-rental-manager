# Firebase Setup Guide - Car Rental Manager

## 🎯 What You're Setting Up
A free Firebase Realtime Database that will sync your car rental data across all devices in real-time.

---

## 📋 Step-by-Step Setup (5 Minutes)

### Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/

2. **Click "Add project"** (or **"Create a project"** if first time)

3. **Enter project name**: `Car Rental Manager`

4. **Google Analytics**: Click **"Continue"**
   - Uncheck **"Enable Google Analytics"** (not needed)
   - Click **"Create project"**

5. **Wait** ~30 seconds for project creation

6. Click **"Continue"** when ready

---

### Step 2: Create Realtime Database

1. **In the left sidebar**, scroll down and click **"Build"** → **"Realtime Database"**

2. Click **"Create Database"** button

3. **Select location**:
   - Choose **"asia-southeast1"** (Singapore - closest to Pakistan)
   - Or **"europe-west1"** if Singapore not available
   - Click **"Next"**

4. **Security rules**:
   - Select **"Start in test mode"** ← Important!
   - This allows public read/write for 30 days
   - Click **"Enable"**

5. **Wait** ~10 seconds for database creation

---

### Step 3: Get Your Database URL

1. You should now see your database dashboard

2. **Look at the top** - you'll see a URL like:
   ```
   https://car-rental-manager-xxxxx-default-rtdb.firebaseio.com/
   ```
   Or:
   ```
   https://car-rental-manager-xxxxx.firebaseio.com/
   ```

3. **Copy this ENTIRE URL** (including https:// and trailing /)

4. **Paste it here** and I'll integrate it into your app!

---

## 🔐 Security Rules (Optional - After Testing)

After you test and everything works, you can update security rules:

1. Go to **Realtime Database** → **Rules** tab

2. Change from test mode to:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. Click **"Publish"**

This keeps it simple - anyone with the URL can read/write. Since it's just your business data and the app is only shared with your driver, this is fine.

---

## ✅ What to Expect

**After Setup:**
- ✅ Data syncs instantly across devices
- ✅ You and driver see same information
- ✅ Works offline (syncs when back online)
- ✅ Free forever (within limits)
- ✅ Can export to CSV anytime

**Firebase Free Tier Limits:**
- 1GB storage (enough for years)
- 10GB/month downloads
- 100 simultaneous connections
- More than enough for 2 users!

---

## 🆘 Troubleshooting

**Can't find "Realtime Database"?**
- Make sure you're looking under "Build" section in left sidebar
- NOT "Firestore Database" (different product)

**Database URL doesn't work?**
- Make sure you copied the FULL URL with https:// and trailing /
- Should end with `.firebaseio.com/`

**Security rules warning?**
- Normal in test mode
- Will remind you to update in 30 days
- Can ignore for now

---

**Ready? Set up Firebase and paste your database URL here!**

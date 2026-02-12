# Fix 401 Unauthorized Error - Apps Script Deployment

## 🚨 The Problem
You're getting `401 (Unauthorized)` error, which means the Apps Script isn't set to allow public access.

## ✅ Solution: Fix Deployment Settings

### Step 1: Open Manage Deployments
1. Go to your Google Sheet
2. **Extensions** → **Apps Script**
3. Click **Deploy** → **Manage deployments**

### Step 2: Edit Your Deployment
1. Click the **✏️ Edit** (pencil icon) on your deployment
2. Check these settings **VERY CAREFULLY**:

   **⚠️ Execute as:** Must be **"Me (your email)"**
   
   **⚠️ Who has access:** Must be **"Anyone"** ← THIS IS CRITICAL!
   
3. Under "Version", select **"New version"**
4. Click **Deploy**

### Step 3: Authorize the Script
After deployment, you might see:
- "Authorization required" 
- Click **Review Permissions**
- Choose your Google account
- Click **Advanced** at the bottom
- Click **"Go to [Project Name] (unsafe)"**
- Click **"Allow"**

### Step 4: Test Again
1. Go to: https://aunnaqvi1994.github.io/car-rental-manager/
2. Press F12 to open Console
3. Clear any old errors
4. Try adding an entry
5. You should NOT see 401 error anymore

---

## 🔍 Visual Guide

### What "Who has access" Should Look Like:
```
┌─────────────────────────────────────┐
│ Who has access                      │
│                                     │
│ ○ Only myself                       │
│ ● Anyone                    ← Select THIS!
│                                     │
└─────────────────────────────────────┘
```

---

## 🆘 If Still Not Working

1. **Delete the deployment completely**:
   - Deploy → Manage deployments
   - Click 🗑️ (trash icon)
   - Confirm deletion

2. **Create a brand new deployment**:
   - Deploy → New deployment
   - Type: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy

3. **Copy the NEW URL** and let me know if it's different

---

## 💡 Why This Happens

The **401 error** means Google is blocking access because:
- "Who has access" is set to "Only myself" instead of "Anyone"
- The script requires authentication, but your web app can't provide it

Setting it to **"Anyone"** allows the public web app to access it without login.

---

**Try these steps and let me know what happens!**

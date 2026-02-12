# Car Rental Manager - Deployment Guide

## 🚀 Quick Deployment to GitHub Pages

Your car rental manager is ready to deploy! Follow these simple steps to make it accessible from any mobile device.

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Create your free account

### Step 2: Create a New Repository
1. Click the **"+"** button in the top right → **"New repository"**
2. **Repository name**: `car-rental-manager`
3. **Visibility**: Select **Public**
4. **Do NOT** check "Initialize with README"
5. Click **"Create repository"**

### Step 3: Push Your Code

The code is already initialized with git. Now push it to GitHub:

```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager

# Add your GitHub repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/car-rental-manager.git

# Push the code
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. The deployment will start automatically!

### Step 5: Access Your App
After about 1-2 minutes, your app will be live at:
```
https://USERNAME.github.io/car-rental-manager/
```

**Replace `USERNAME` with your actual GitHub username**

## 📱 Using on Mobile

1. Open the URL on your phone's browser
2. Tap the **Share** button
3. Select **"Add to Home Screen"**
4. Now you have an app icon on your phone!

## 🔐 Important Security Notes

### Owner Password
- **Current password**: `1234`
- **To change it**: Edit the `app.js` file and replace `'1234'` with your preferred password in all three delete functions

### How It Works
- **Driver can**: View all data, add new entries
- **Driver cannot**: Delete any entries (protected by password)
- **Owner can**: Do everything (knows the password)

## 🎯 Features Added

### ✅ Password-Protected Deletes
All delete operations (daily entries, monthly expenses, maintenance records) now require a password. Only the owner can delete data.

### ✅ Report Totals
The Daily Reports section now shows:
- **Your Total Share**: Sum of all your shares for displayed entries
- **Driver's Total Share**: Sum of all driver shares for displayed entries
- Updates automatically when you filter by month or show all

## 🔄 Updating the App

Whenever you make changes:

```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically update your app within 1-2 minutes!

## ⚠️ Data Sync Note

Remember: localStorage is device-specific. Each device (your phone, driver's phone) will have its own data. For best results:
- Use one shared device for data entry
- Or designate one person as the data entry person

## 🆘 Troubleshooting

**Q: The GitHub Actions deployment isn't working**  
A: Make sure you selected "GitHub Actions" in Settings → Pages, not "Deploy from a branch"

**Q: I forgot my password**  
A: Edit `app.js` and search for `'1234'` - change it to your new password in all delete functions

**Q: Can I use a custom domain?**  
A: Yes! In Settings → Pages, you can add a custom domain

---

**Your app location**: `/home/active/.gemini/antigravity/scratch/car-rental-manager/`

**Password**: 1234 (change this in app.js)

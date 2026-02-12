# Quick Deployment Guide

## 🚀 Deploy Changes in 3 Commands

Whenever you make changes to your Car Rental Manager app, run these commands:

```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git add .
git commit -m "Describe your changes here"
git push origin main
```

**Wait 1-2 minutes** → Your changes will be live at:
**https://aunnaqvi1994.github.io/car-rental-manager/**

---

## 📋 Step-by-Step Examples

### Example 1: Changed Password
```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git add .
git commit -m "Changed owner password"
git push origin main
```

### Example 2: Updated Styling
```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git add .
git commit -m "Updated colors and fonts"
git push origin main
```

### Example 3: Added New Feature
```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git add .
git commit -m "Added expense categories feature"
git push origin main
```

---

## 🔐 Authentication

**If asked for credentials:**
- **Username**: `aunnaqvi1994`
- **Password**: Use your **Personal Access Token** (not GitHub password)

---

## ✅ Verify Deployment

1. **Check GitHub**: Go to https://github.com/aunnaqvi1994/car-rental-manager
   - Your commit should appear in the commit history
   
2. **Wait 1-2 minutes** for GitHub Pages to rebuild

3. **Test your app**: https://aunnaqvi1994.github.io/car-rental-manager/
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

---

## 🆘 Troubleshooting

**Problem: Git says "nothing to commit"**
- Solution: You haven't made any changes, or changes aren't saved

**Problem: Git asks for password and rejects it**
- Solution: Use Personal Access Token, not password
- See `GITHUB_TOKEN_GUIDE.md` for help

**Problem: Changes not showing on website**
- Solution: Wait 2 minutes, then hard refresh browser

---

## 🎯 Common Changes You Might Make

| What to Change | File to Edit | Line/Location |
|----------------|-------------|---------------|
| Owner Password | `app.js` | Search for `'1234'` |
| Currency Symbol | `app.js` | Function `formatCurrency()` |
| App Colors | `styles.css` | CSS variables at top |
| App Name | `index.html` | `<title>` tag |
| Form Fields | `index.html` | Forms section |

---

**Quick Tip**: Always test your changes locally (open `index.html` in browser) before deploying!

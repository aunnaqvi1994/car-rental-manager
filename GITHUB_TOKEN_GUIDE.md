# GitHub Deployment with Personal Access Token

## The Problem
GitHub no longer accepts passwords. You need a **Personal Access Token (PAT)**.

## Solution: Create a Personal Access Token

### Step 1: Create Token
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `car-rental-deployment`
4. Set expiration: **No expiration** (or your preference)
5. Select scope: **✅ repo** (check the box)
6. Click **"Generate token"**
7. **COPY THE TOKEN** - you won't see it again!

### Step 2: Use Token Instead of Password

When you run:
```bash
git push -u origin main
```

**Username**: `aunnaqvi1994` (or your GitHub username)  
**Password**: Paste the **token** (not your GitHub password)

### Step 3: Save Credentials (Optional)

To avoid entering token every time:
```bash
# Store credentials for this project only
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git config credential.helper store
```

Then push once with the token - it will be saved for future pushes.

---

## Alternative: Use SSH (No Passwords Ever)

### One-time SSH Setup
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for all prompts (default location)

# Copy the public key
cat ~/.ssh/id_ed25519.pub
```

### Add to GitHub
1. Go to [github.com/settings/keys](https://github.com/settings/keys)
2. Click **"New SSH key"**
3. Paste the key
4. Save

### Change Remote URL to SSH
```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager
git remote remove origin
git remote add origin git@github.com:aunnaqvi1994/car-rental-manager.git
git push -u origin main
```

---

## Different Account for This Project Only

If you want to use a different GitHub account just for this project:

```bash
cd /home/active/.gemini/antigravity/scratch/car-rental-manager

# Set username/email for THIS project only (doesn't affect office account)
git config user.name "Your Personal Name"
git config user.email "your_personal_email@example.com"

# Now push with personal account token
git push -u origin main
```

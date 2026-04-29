# GitHub & Vercel Deployment Steps

## Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in details:
   - **Repository name**: `text-asset-manager` (or your preferred name)
   - **Description**: `E-commerce platform for Fishy Spot`
   - **Visibility**: Public (required for free Vercel deployment)
   - Leave other options as default
3. Click **Create repository**
4. Copy the repository URL (looks like `https://github.com/YOUR_USERNAME/text-asset-manager.git`)

### Step 2: Initialize Git Locally (if not already done)

```bash
# Navigate to project root
cd "c:\Users\Neha Sondkar\Downloads\Text-Asset-Manager (1)\Text-Asset-Manager"

# Initialize git (if .git doesn't exist)
git init

# Add your name and email
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 3: Add Remote and Push Code

```bash
# Add GitHub as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/text-asset-manager.git

# Rename branch to main if needed
git branch -M main

# Stage all changes
git add .

# Commit changes
git commit -m "Initial commit: Vercel-ready full-stack project"

# Push to GitHub
git push -u origin main
```

### Step 4: Verify on GitHub

1. Refresh https://github.com/YOUR_USERNAME/text-asset-manager
2. You should see all your files uploaded ✅

---

## Part 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Sign up or log in (you can use GitHub account)

#### Step 2: Import Repository

1. Click **Add New** → **Project**
2. Under "Import Git Repository", click **GitHub**
3. Select the GitHub repository you want to deploy
4. Click **Import**

#### Step 3: Configure Project

Vercel will auto-detect:
- **Framework**: Other ✓
- **Root Directory**: Leave blank (monorepo root) ✓
- **Build Command**: `pnpm install --frozen-lockfile && pnpm run build` ✓
- **Output Directory**: `artifacts/fishy-spot/dist/public` ✓

✓ All pre-configured in your `vercel.json`! Just click **Deploy**.

#### Step 4: Wait for Build

- Watch the build progress in Vercel Dashboard
- First build typically takes 2-5 minutes
- You'll get a notification when complete

#### Step 5: Access Your Site

Once deployed, you'll get a URL like:
```
https://text-asset-manager.vercel.app
```

✅ Your site is live! 🎉

---

### Option B: Deploy via Vercel CLI (Alternative)

#### Step 1: Install Vercel CLI

```bash
# Install globally
npm install -g vercel

# Or with pnpm
pnpm add -g vercel
```

#### Step 2: Link Your Project

```bash
# From project root
vercel login

# Follow prompts to authenticate with GitHub
```

#### Step 3: Deploy

```bash
# Deploy to preview
vercel

# Or deploy directly to production
vercel --prod
```

#### Step 4: Follow Prompts

```
? Set up and deploy "~/Text-Asset-Manager"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? text-asset-manager
? In which directory is your code located? ./
? Auto-detected project settings for <framework>. Confirm? [Y/n] y
```

---

## Complete Step-by-Step Checklist

### Before You Start
- [ ] GitHub account created
- [ ] Git installed locally
- [ ] Project files ready
- [ ] All changes committed locally

### Push to GitHub
- [ ] Create GitHub repository
- [ ] Configure git locally (`git config user.name` etc.)
- [ ] Add remote: `git remote add origin <URL>`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Push: `git push -u origin main`
- [ ] Verify files on GitHub.com

### Deploy to Vercel (Dashboard Method)
- [ ] Create/Log in Vercel account
- [ ] Click "Add New" → "Project"
- [ ] Import GitHub repository
- [ ] Verify settings (should auto-detect)
- [ ] Click "Deploy"
- [ ] Wait for build completion
- [ ] Visit provided URL

### After Deployment
- [ ] Test frontend loads
- [ ] Test API endpoints:
  - `GET https://your-domain.vercel.app/api/healthz`
  - `GET https://your-domain.vercel.app/api/fish`
  - `GET https://your-domain.vercel.app/api/orders`
- [ ] Test SPA routing (refresh page, go back)
- [ ] Check browser console for errors

---

## Quick Command Reference

```bash
# Git commands
git init                                    # Initialize git
git config user.name "Your Name"           # Set user name
git config user.email "email@example.com"  # Set email
git remote add origin <GITHUB_URL>         # Add GitHub remote
git add .                                  # Stage all files
git commit -m "message"                    # Commit changes
git push -u origin main                    # Push to GitHub
git status                                 # Check status

# Vercel CLI commands
vercel login                               # Authenticate with Vercel
vercel                                     # Deploy to preview
vercel --prod                              # Deploy to production
vercel env pull                            # Download env variables
```

---

## Troubleshooting

### GitHub Issues

**"Permission denied (publickey)"**
```bash
# Generate SSH key if needed
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub Settings → SSH and GPG keys
```

**"Repository not found"**
- Check GitHub URL is correct
- Make sure repo is public (for free Vercel)
- Verify username spelling

**"Commits not appearing"**
```bash
# Check git config
git config --list

# Update if needed
git config user.name "Correct Name"
git config user.email "correct@email.com"
```

### Vercel Issues

**Build fails with "pnpm: command not found"**
- Vercel should auto-detect pnpm
- Check `vercel.json` has correct install command
- Rebuild or contact Vercel support

**"Module not found" errors**
```bash
# Verify locally first
pnpm install
pnpm run build

# Check pnpm-lock.yaml is committed
git add pnpm-lock.yaml
git commit -m "Add pnpm lock file"
git push
```

**API endpoints return 404**
- Check `/api/index.ts` exists
- Verify routes in `artifacts/api-server/src/routes/`
- Check function runtime in `vercel.json`

**Static files not loading**
- Check output directory: `artifacts/fishy-spot/dist/public`
- Verify rewrites in `vercel.json`
- Check `.vercelignore` isn't excluding important files

---

## After Successful Deployment

### 1. Set Up Custom Domain (Optional)
```
Vercel Dashboard → Settings → Domains
Add your domain → Follow DNS instructions
```

### 2. Add Environment Variables (if needed)
```
Vercel Dashboard → Settings → Environment Variables
Add any API keys, database URLs, etc.
Redeploy after adding
```

### 3. Enable Auto-Deployments
- Already enabled! Every `git push` to main automatically deploys

### 4. Set Up Preview Deployments
- Already enabled! Every pull request gets a preview URL

### 5. Configure Custom Email
- Vercel Dashboard → Settings → Email
- Change notification email address

---

## Testing Your Deployment

### Frontend
```bash
# Visit in browser
https://your-domain.vercel.app

# Should see Fishy Spot homepage
# Test navigation, responsive design
```

### API Endpoints
```bash
# Terminal - test health check
curl https://your-domain.vercel.app/api/healthz

# Should return: {"status":"ok","timestamp":"..."}

# Test fish endpoint
curl https://your-domain.vercel.app/api/fish

# Test orders endpoint
curl https://your-domain.vercel.app/api/orders
```

### SPA Routing
```bash
# These should all work without 404:
https://your-domain.vercel.app
https://your-domain.vercel.app/shop
https://your-domain.vercel.app/cart
https://your-domain.vercel.app/checkout
```

---

## Environment-Specific URLs

After deployment, you'll have:

| Environment | URL |
|-------------|-----|
| Production | `https://text-asset-manager.vercel.app` |
| Pull Requests | `https://text-asset-manager-pr-1.vercel.app` |
| Custom Domain | `https://your-custom-domain.com` |

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to Vercel
3. ⏭️ Make a test commit and verify auto-deployment works
4. ⏭️ Share live URL with team/users
5. ⏭️ Monitor Vercel Analytics for performance

---

## Support

- **GitHub Help**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **This Project Docs**: See `VERCEL_DEPLOYMENT.md`

**Happy deploying! 🚀**

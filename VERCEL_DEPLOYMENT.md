# Vercel Deployment Guide

This project is configured for deployment to Vercel. It consists of a React frontend (Fishy Spot) and an Express.js API backend.

## Project Structure

```
├── artifacts/
│   ├── api-server/          # Express.js API backend
│   ├── fishy-spot/          # React frontend (Vite)
│   └── mockup-sandbox/      # Development/demo site
├── lib/                      # Shared libraries
├── api/                      # Vercel serverless API functions
├── vercel.json              # Vercel configuration
└── .vercelignore            # Files to ignore during deployment
```

## Prerequisites

- Node.js 20+ (Vercel uses Node.js 20)
- pnpm package manager
- Vercel CLI (optional, for local testing): `npm i -g vercel`
- Vercel account (https://vercel.com)

## Setup Instructions

### 1. Local Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# For development with hot reload, run from each directory:
# Terminal 1 - API Server
cd artifacts/api-server
pnpm run dev

# Terminal 2 - Frontend
cd artifacts/fishy-spot
pnpm run dev
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to https://vercel.com/new
3. Import your repository
4. Vercel will auto-detect this is a monorepo
5. Configure the following:
   - **Framework Preset**: Other (already configured)
   - **Root Directory**: Leave blank (monorepo root)
   - **Build Command**: `pnpm run build` (auto-detected)
   - **Output Directory**: `artifacts/fishy-spot/dist/public` (auto-detected)
   - **Install Command**: `pnpm install --frozen-lockfile` (auto-detected)

6. Add environment variables (optional):
   ```
   NODE_ENV=production
   BASE_PATH=/
   ```

7. Deploy!

#### Option B: Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## What Gets Deployed

### Frontend
- React app built with Vite
- Outputs to: `artifacts/fishy-spot/dist/public`
- Serves static files with optimal caching headers
- Implements SPA routing (all routes redirect to index.html)

### API
- Serverless Node.js functions in `/api` directory
- Express.js app handling:
  - `/api/healthz` - Health check
  - `/api/fish` - Fish catalogue endpoints
  - `/api/orders` - Order management endpoints
  - `/healthz` - API health status

## Environment Variables

On Vercel, the following are automatically set by the `vercel.json` configuration:
- `NODE_ENV`: `production`
- `BASE_PATH`: `/`

Add additional environment variables in Vercel Dashboard → Settings → Environment Variables

## Build Details

### What Happens During Build

1. **pnpm install**: Installs all dependencies across the monorepo
2. **TypeScript Check**: Validates all TypeScript files
3. **Frontend Build**: Builds React app to static assets
4. **API Build**: Prepares serverless functions

The build optimizes for:
- Tree shaking and dead code elimination
- Asset minification
- Code splitting for better caching
- ESM module format for smaller bundles

## Caching Strategy

- **index.html**: No cache (must always get latest)
- **Assets** (/assets/*): 1-year immutable cache
- **API responses**: Depends on endpoint (configure as needed)

## Troubleshooting

### Build Fails
- Check that `pnpm-lock.yaml` is committed
- Ensure all TypeScript compiles locally: `pnpm run typecheck`
- Check build logs in Vercel Dashboard

### API Not Working
- Verify API handler at `/api/index.ts` is correct
- Check that express and dependencies are installed
- Use `/healthz` endpoint to debug: `curl https://your-domain.vercel.app/api/healthz`

### Frontend Not Loading
- Clear browser cache
- Check that static assets are in correct directory
- Verify `vercel.json` rewrite rules

### Large Build Size
- Check `.vercelignore` to ensure unnecessary files are excluded
- Review `pnpm-lock.yaml` for duplicate dependencies
- Consider optimizing dependencies

## Monitoring

After deployment:
1. Visit your Vercel Dashboard
2. Check "Analytics" for performance metrics
3. Monitor "Logs" for any runtime errors
4. View "Deployments" history for rollback options

## Performance Tips

1. **Minimize build time**
   - Remove unused dependencies
   - Use `pnpm install --frozen-lockfile`

2. **Reduce function size**
   - Keep API functions focused
   - Use serverless function timeouts wisely (default: 10s)

3. **Optimize assets**
   - Use Vite's automatic code splitting
   - Lazy load components in React

4. **CDN & Caching**
   - Static assets cached globally
   - Configure long cache headers for immutable assets

## Production Checklist

Before going live:
- [ ] Test all API endpoints
- [ ] Verify frontend loads correctly
- [ ] Check mobile responsiveness
- [ ] Test error pages (404, 500, etc.)
- [ ] Monitor Vercel Analytics
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure custom domain if needed
- [ ] Enable automatic deployments for main branch

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Node.js Runtime](https://vercel.com/docs/functions/serverless-functions/node-js)
- [Best Practices](https://vercel.com/docs/concepts/analytics/performance-insights)

## Support

For deployment issues:
1. Check Vercel Dashboard logs
2. Review this guide
3. Visit [Vercel Support](https://vercel.com/support)

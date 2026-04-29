# Environment Variables Configuration for Vercel

## Overview

This project uses environment variables for configuration. On Vercel, these are managed through the Dashboard.

## Environment Variables by Deployment Target

### Vercel Production (Automatic)

The following variables are automatically set by `vercel.json`:
```
NODE_ENV=production
BASE_PATH=/
```

### Vercel Preview Deployments

Same as production - no additional configuration needed.

### Local Development

Create `.env.local` in the project root:

```bash
# Copy template
cp .env.example .env.local

# Edit with your values
```

## Available Variables

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `NODE_ENV` | `development` | Execution environment | No |
| `PORT` | `3000` | Server port for local dev | No |
| `BASE_PATH` | `/` | Frontend base path | No |
| `API_PORT` | `5000` | API server port | No |
| `DATABASE_URL` | - | Database connection string | No* |

*Only required if using database features

## Setting Variables in Vercel Dashboard

1. Go to your project on vercel.com
2. Navigate to **Settings** → **Environment Variables**
3. Add variable name and value
4. Choose environments: Production, Preview, Development
5. Click "Save"
6. Redeploy your project

## Sensitive Variables (Secrets)

For sensitive information (API keys, tokens, etc.):

1. Use Vercel's Secrets feature (same place as env vars)
2. Reference in functions as: `process.env.YOUR_SECRET_NAME`
3. **Never** commit `.env.local` with real secrets to git
4. Add `.env.local` to `.gitignore` (already done)

## Example: Adding a Database URL

1. In Vercel Dashboard:
   - Environment Variables
   - Add: `DATABASE_URL` = `postgres://...`
   - Set to "Production" only
   - Save

2. In your code:
   ```typescript
   const dbUrl = process.env.DATABASE_URL;
   ```

## Accessing Variables in Code

### Frontend (React/Vite)

Variables available at build time:
```typescript
// Only VITE_ prefixed vars are available
const apiBase = import.meta.env.VITE_API_BASE || '/api';
```

To add frontend env vars:
1. Prefix with `VITE_` in Vercel Dashboard
2. Example: `VITE_API_ENDPOINT=/api`

### Backend (API Functions)

All variables available at runtime:
```typescript
const nodeEnv = process.env.NODE_ENV;
const dbUrl = process.env.DATABASE_URL;
```

## Deployment Flow

```
Local Development
  ↓ (uses .env.local)
  ↓
Git Push to GitHub
  ↓
Vercel Webhook Triggered
  ↓
Build with environment variables from Dashboard
  ↓
Deploy
```

## Best Practices

✅ **DO:**
- Use Vercel Dashboard for all production secrets
- Keep `.env.local` in `.gitignore`
- Use different values for different environments
- Document required variables
- Rotate secrets regularly

❌ **DON'T:**
- Commit `.env.local` to git
- Put secrets in code
- Use same secrets across environments
- Share Dashboard access unnecessarily
- Leave default secrets in production

## Troubleshooting

### "Environment variable not found"
- Check variable is added in Vercel Dashboard
- Verify correct environment (Production/Preview)
- Ensure variable name matches exactly (case-sensitive)
- Redeploy after adding variables

### "Works locally but not on Vercel"
- Missing variable in Vercel Dashboard
- Variable scoped to wrong environment
- Typo in variable name
- Not redeployed after adding variable

### "Different behavior in Preview vs Production"
- Different values set for each environment
- Check Dashboard environment settings
- Redeploy preview environment
- Check build logs for actual values used

## For Team Collaboration

When onboarding new developers:

1. Share `env.example` (not `.env.local`)
2. They create their own `.env.local`
3. For production, only dashboard admins manage secrets
4. Use Vercel team features for access control

## Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel CLI - env commands](https://vercel.com/docs/cli#commands/pull-environment-variables)
- [Environment Variables Best Practices](https://12factor.net/config)

## Quick Reference - Vercel CLI

```bash
# Pull variables from production
vercel env pull

# Pull from specific environment
vercel env pull --environment=production

# List all environment variables
vercel env list
```

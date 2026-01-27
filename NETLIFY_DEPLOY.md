# GameDen - Netlify Deployment Guide

## Quick Deploy to Netlify

### Option 1: Netlify CLI (Recommended)

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
```

4. Deploy to production:
```bash
netlify deploy --prod
```

### Option 2: Netlify Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18
6. Click "Deploy site"

### Option 3: Drag and Drop

1. Build your project locally:
```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder

## Environment Variables

If you're using Firebase or EmailJS, add these environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add your environment variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

## Custom Domain Setup

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `gamedenbookings.fun`
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

## Post-Deployment Checklist

- ✅ Site loads correctly
- ✅ All routes work (home, booking)
- ✅ Firebase connection works
- ✅ EmailJS notifications work
- ✅ Images load properly
- ✅ Mobile responsive
- ✅ SSL/HTTPS enabled
- ✅ Custom domain configured

## Continuous Deployment

Once connected to Git, Netlify will automatically deploy when you push to your repository:
- Push to `main` branch → Production deploy
- Push to other branches → Preview deploy

## Build Status Badge

Add to your README.md:
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
```

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Netlify (draft)
netlify deploy

# Deploy to production
netlify deploy --prod

# Open Netlify dashboard
netlify open
```

## Support

For issues or questions:
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev
- Contact: gamedenoffiz@gmail.com

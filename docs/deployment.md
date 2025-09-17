# Deployment Guide

This guide covers deploying the Science 1B website to Netlify (frontend) and Render (backend).

## Prerequisites

- GitHub account
- Netlify account
- Render account
- PostgreSQL database (can be provided by Render)

## Frontend Deployment (Netlify)

### 1. Prepare Frontend for Production

```bash
cd frontend
npm run build
```

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard

1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/.next`
   - **Node version**: `18`
5. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com/api`
6. Click "Deploy site"

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd frontend
netlify deploy --prod --dir=.next
```

### 3. Configure Custom Domain (Optional)

1. In Netlify dashboard, go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed

## Backend Deployment (Render)

### 1. Prepare Backend for Production

```bash
cd backend
npm run build
```

### 2. Deploy to Render

#### Option A: Deploy via Render Dashboard

1. Go to [Render](https://render.com) and sign in
2. Click "New +" > "Web Service"
3. Connect your GitHub repository
4. Configure service settings:
   - **Name**: `science-1b-backend`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `JWT_SECRET`: Generate a secure random string
   - `FRONTEND_URL`: Your Netlify URL
6. Click "Create Web Service"

#### Option B: Deploy via Render CLI

```bash
# Install Render CLI
npm install -g @render/cli

# Login to Render
render login

# Deploy
cd backend
render deploy
```

### 3. Set up PostgreSQL Database

1. In Render dashboard, go to "New +" > "PostgreSQL"
2. Configure database:
   - **Name**: `science-1b-db`
   - **Plan**: Free
   - **Database Name**: `science_1b_db`
   - **User**: `science_1b_user`
3. Copy database credentials
4. Update your backend environment variables with database credentials

### 4. Run Database Migrations

```bash
# Connect to your deployed backend
cd backend
npm run db:migrate
npm run db:seed
```

## Environment Variables

### Frontend (Netlify)

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

### Backend (Render)

```env
NODE_ENV=production
PORT=10000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=science_1b_db
DB_USER=science_1b_user
DB_PASSWORD=your-db-password
JWT_SECRET=your-jwt-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FRONTEND_URL=https://your-frontend-url.netlify.app
```

## Post-Deployment Steps

### 1. Test the Application

1. Visit your frontend URL
2. Test all functionality:
   - Navigation between pages
   - Contact form submission
   - Gallery viewing
   - Article reading

### 2. Set up Monitoring

1. **Netlify**: Monitor build status and site performance
2. **Render**: Monitor service health and logs
3. **Database**: Monitor database performance and storage

### 3. Configure SSL/HTTPS

Both Netlify and Render provide automatic SSL certificates. Ensure your custom domain uses HTTPS.

### 4. Set up Backups

1. **Database**: Render provides automatic backups for paid plans
2. **Code**: Ensure your code is backed up in GitHub
3. **Media**: Consider using a CDN for images and videos

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify database credentials
   - Check if database is accessible from Render
   - Ensure migrations have been run

3. **CORS Issues**
   - Verify FRONTEND_URL environment variable
   - Check CORS configuration in backend

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names and values
   - Restart services after changing variables

### Getting Help

- Check service logs in Netlify/Render dashboards
- Review GitHub Actions logs (if using CI/CD)
- Test locally with production environment variables

## Maintenance

### Regular Tasks

1. **Security Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update environment variables regularly

2. **Performance Monitoring**
   - Monitor site speed and performance
   - Optimize images and assets
   - Review database query performance

3. **Backup Verification**
   - Test database restore procedures
   - Verify backup integrity
   - Document recovery procedures

## Scaling

### When to Scale

- High traffic periods
- Database performance issues
- Increased storage needs

### Scaling Options

1. **Netlify**: Upgrade to Pro plan for better performance
2. **Render**: Upgrade to paid plans for more resources
3. **Database**: Upgrade to higher-tier database plans
4. **CDN**: Consider using a CDN for static assets

## Cost Optimization

### Free Tier Limits

- **Netlify**: 100GB bandwidth, 300 build minutes
- **Render**: 750 hours/month, 512MB RAM
- **PostgreSQL**: 1GB storage, 1GB RAM

### Optimization Tips

1. Optimize images and assets
2. Use efficient database queries
3. Implement caching strategies
4. Monitor resource usage

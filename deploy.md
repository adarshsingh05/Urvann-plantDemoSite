# 🚀 Render Deployment Guide

## Backend Deployment

### 1. Create Web Service
- Go to [render.com](https://render.com)
- Click "New +" → "Web Service"
- Connect GitHub repository: `urvan`

### 2. Configure Backend
```
Name: urvan-backend
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

### 3. Environment Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urvan
JWT_SECRET=your_secret_key_here
NODE_ENV=production
PORT=10000
```

### 4. Deploy
- Click "Create Web Service"
- Wait for deployment
- Note backend URL: `https://urvan-backend.onrender.com`

## Frontend Deployment

### 1. Create Static Site
- Click "New +" → "Static Site"
- Connect same GitHub repository

### 2. Configure Frontend
```
Name: urvan-frontend
Root Directory: frontend
Build Command: npm run build
Publish Directory: dist
```

### 3. Environment Variables
```
VITE_API_URL=https://urvan-backend.onrender.com/api
```

### 4. Deploy
- Click "Create Static Site"
- Wait for build and deployment
- Frontend URL: `https://urvan-frontend.onrender.com`

## Post-Deployment

### 1. Test Your Application
- Visit frontend URL
- Test all features
- Check API connectivity

### 2. Update CORS (if needed)
- If you get CORS errors, update backend CORS settings
- Add your frontend URL to allowed origins

### 3. Monitor Logs
- Check Render dashboard for any errors
- Monitor API performance

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Update backend CORS configuration
2. **Build Failures**: Check environment variables
3. **API Timeouts**: Increase timeout in frontend API config
4. **Database Connection**: Verify MongoDB Atlas connection string

### Useful Commands:
```bash
# Check backend logs
# Go to Render dashboard → Backend service → Logs

# Check frontend build logs
# Go to Render dashboard → Frontend service → Logs
```

## URLs After Deployment:
- **Frontend**: https://urvan-frontend.onrender.com
- **Backend API**: https://urvan-backend.onrender.com/api
- **Health Check**: https://urvan-backend.onrender.com/api/health

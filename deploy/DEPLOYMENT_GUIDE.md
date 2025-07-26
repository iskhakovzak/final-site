# 🚀 Deployment Guide - Media Upload System

## Overview

This guide will help you deploy the enhanced portfolio website with unlimited media upload capabilities, Supabase photo storage, and server-based video hosting.

## 📋 Prerequisites

Before deployment, ensure you have:

- **Supabase Account**: Create a project at [supabase.com](https://supabase.com)
- **Web Server**: With PHP support for video uploads
- **Domain/Hosting**: Where the website will be deployed
- **FFmpeg** (optional): For video thumbnail generation

## 🔧 Setup Instructions

### 1. Supabase Configuration

#### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and API keys

#### B. Setup Database
1. Go to SQL Editor in your Supabase dashboard
2. Run the SQL commands from `supabase-setup.sql`
3. This will create:
   - `portfolio_items` table
   - Storage bucket for media
   - Row Level Security policies
   - Necessary indexes

#### C. Configure Storage
1. Go to Storage in your Supabase dashboard
2. Verify the `media` bucket was created
3. Create folders: `photos/`, `videos/`, `thumbnails/`

### 2. Environment Configuration

#### A. Copy Environment File
```bash
cp .env.example .env
```

#### B. Update Environment Variables
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Server Setup

#### A. Upload Files
Upload all files to your web server:
```
deploy/
├── index.html (or seconss.html as main)
├── css/
├── js/
├── api/
├── videos/ (create this directory)
├── data/ (create this directory)
└── .htaccess
```

#### B. Set Permissions
```bash
chmod 755 api/
chmod 777 videos/
chmod 777 data/
chmod 644 api/upload-video.php
```

#### C. Create Required Directories
```bash
mkdir -p videos/thumbnails
mkdir -p data
```

### 4. Web Server Configuration

#### A. Apache (.htaccess included)
The provided `.htaccess` file includes:
- File upload size limits
- CORS headers
- Caching rules
- Security headers

#### B. Nginx (add to server block)
```nginx
location /api/ {
    try_files $uri $uri/ =404;
}

location /videos/ {
    expires 3M;
    add_header Cache-Control "public, immutable";
}

client_max_body_size 50M;
```

#### C. PHP Configuration
Ensure these PHP settings:
```ini
upload_max_filesize = 50M
post_max_size = 52M
max_execution_time = 300
memory_limit = 256M
```

## 🎯 Features Enabled

### ✅ Unlimited Photo Uploads
- **Storage**: Supabase cloud storage
- **Formats**: JPEG, PNG, WebP, GIF
- **Size Limit**: 50MB per file
- **Features**: 
  - Automatic thumbnail generation
  - Metadata management
  - Drag & drop interface
  - Progress tracking

### ✅ Server-Based Video Hosting
- **Storage**: Your web server
- **Formats**: MP4, WebM, MOV, AVI
- **Size Limit**: 50MB per file
- **Features**:
  - Automatic thumbnail generation (requires FFmpeg)
  - Metadata management
  - Direct server streaming

### ✅ Admin Interface
- **Access**: Click the ⚙️ button (bottom right)
- **Upload Interface**: Drag & drop for photos/videos
- **Management**: View, edit, delete existing media
- **Bulk Operations**: Upload multiple files simultaneously

## 🔒 Security Considerations

### A. Authentication
The current setup allows public uploads. For production:

1. **Implement Authentication**:
```javascript
// Add to supabase-config.js
async checkAuth() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user !== null;
}
```

2. **Protect Admin Interface**:
```javascript
// Add password protection
const adminPassword = prompt('Enter admin password:');
if (adminPassword !== 'your-secure-password') {
    alert('Access denied');
    return;
}
```

### B. File Validation
Enhanced server-side validation is included:
- File type checking
- Size limits
- Virus scanning (recommended)

## 📊 Testing Checklist

### ✅ Photo Upload Tests
- [ ] Upload JPEG images
- [ ] Upload PNG images
- [ ] Upload WebP images
- [ ] Test file size limits
- [ ] Verify Supabase storage
- [ ] Check thumbnail generation
- [ ] Test metadata saving

### ✅ Video Upload Tests
- [ ] Upload MP4 videos
- [ ] Upload WebM videos
- [ ] Test file size limits
- [ ] Verify server storage
- [ ] Check video playback
- [ ] Test thumbnail generation (if FFmpeg enabled)

### ✅ Interface Tests
- [ ] Admin panel opens/closes
- [ ] Drag & drop functionality
- [ ] Upload progress tracking
- [ ] Media management interface
- [ ] Delete functionality
- [ ] Edit metadata

### ✅ Performance Tests
- [ ] Multiple file uploads
- [ ] Large file uploads
- [ ] Concurrent uploads
- [ ] Loading times
- [ ] Mobile responsiveness

## 🚀 Going Live

### 1. Domain Setup
1. Point your domain to your server
2. Update CORS origins in Supabase
3. Update environment variables

### 2. SSL Certificate
```bash
# Using Let's Encrypt (recommended)
certbot --apache -d yourdomain.com
```

### 3. Final Configuration
1. Update all URLs to use HTTPS
2. Test all functionality
3. Monitor error logs
4. Set up backups

## 📈 Monitoring & Maintenance

### A. Log Monitoring
Check these logs regularly:
- PHP error logs
- Apache/Nginx access logs
- Supabase project logs

### B. Storage Management
- Monitor Supabase storage usage
- Clean up old/unused files
- Backup important media

### C. Performance Optimization
- Enable CDN for media files
- Optimize images before upload
- Monitor server resources

## 🆘 Troubleshooting

### Common Issues

#### Upload Fails
- Check file size limits
- Verify directory permissions
- Check PHP configuration
- Review server error logs

#### Supabase Connection Issues
- Verify API keys
- Check CORS settings
- Ensure database policies are correct

#### Video Thumbnails Not Generated
- Install FFmpeg on server
- Check FFmpeg path in PHP script
- Verify directory permissions

## 🎉 Success!

Once deployed, your website will have:
- ✅ Unlimited photo/video uploads
- ✅ Supabase integration for photos
- ✅ Server-based video hosting
- ✅ Professional admin interface
- ✅ Optimized performance
- ✅ Mobile-responsive design

**Admin Access**: Visit your website and click the ⚙️ button to access the upload interface.

---

*Need help? Check the error logs and ensure all configuration steps were completed correctly.*
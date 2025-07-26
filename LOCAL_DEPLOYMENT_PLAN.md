# 🚀 Local Deployment Plan - Sarvinoz Usmanova Portfolio Website

## Project Overview
- **Project Name**: Sarvinoz Usmanova Portfolio Website
- **Type**: Static Website with Dynamic Upload Features
- **Technology Stack**: HTML5, CSS3, JavaScript (ES6+), PHP 7.4+, Supabase
- **Current Environment**: Development files in `/deploy` folder
- **Target Environment**: Local development server

## Pre-Deployment Checklist

### ✅ Code Review & Testing Status
- [ ] HTML structure validated and semantic
- [ ] CSS responsive design tested across screen sizes
- [ ] JavaScript functionality tested (cursor, animations, portfolio filters)
- [ ] Upload system tested with sample files
- [ ] Cross-browser compatibility verified
- [ ] Accessibility features tested

### ✅ Dependencies Verification
- [ ] GSAP library loading correctly
- [ ] Lenis smooth scroll library accessible
- [ ] SplitType text animation library available
- [ ] Supabase JavaScript client loading
- [ ] External font imports working

### ✅ Configuration Requirements
- [ ] Supabase project created and configured
- [ ] Environment variables prepared
- [ ] PHP upload directory permissions set
- [ ] Video storage directory created

### ✅ Backup Procedures
- [ ] Source code backed up to version control
- [ ] Original media files stored separately
- [ ] Database schema exported
- [ ] Environment configuration documented

## 🛠️ Local Environment Setup

### Step 1: Install Local Web Server

#### Option A: XAMPP (Recommended for beginners)
```bash
# Download XAMPP from https://www.apachefriends.org/
# Install and start Apache + PHP services
# Document root: /xampp/htdocs/
```

#### Option B: WAMP (Windows)
```bash
# Download WAMP from http://www.wampserver.com/
# Install and start services
# Document root: /wamp64/www/
```

#### Option C: MAMP (macOS)
```bash
# Download MAMP from https://www.mamp.info/
# Install and configure
# Document root: /Applications/MAMP/htdocs/
```

#### Option D: Native Setup (Advanced)
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install apache2 php7.4 php7.4-cli php7.4-common

# macOS with Homebrew
brew install php apache2

# Windows with Chocolatey
choco install php apache-httpd
```

### Step 2: Configure PHP Settings

Create/edit `php.ini`:
```ini
upload_max_filesize = 50M
post_max_size = 52M
max_execution_time = 300
memory_limit = 256M
file_uploads = On
allow_url_fopen = On
```

### Step 3: Setup Supabase Project

#### A. Create Supabase Account
1. Visit [supabase.com](https://supabase.com)
2. Create new account/login
3. Create new project

#### B. Configure Database
Execute the SQL from `supabase-setup.sql`:
```sql
-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    category text NOT NULL,
    type text DEFAULT 'photo',
    image text,
    video text,
    thumbnail text,
    description text,
    year integer DEFAULT EXTRACT(year FROM now()),
    client text DEFAULT 'Portfolio',
    tags text[] DEFAULT '{}',
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view portfolio items" ON portfolio_items FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can insert portfolio items" ON portfolio_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update portfolio items" ON portfolio_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete portfolio items" ON portfolio_items FOR DELETE TO authenticated USING (true);
```

#### C. Setup Storage Bucket
1. Go to Storage in Supabase dashboard
2. Create bucket named `media`
3. Set public access policy
4. Create folders: `photos/`, `videos/`, `thumbnails/`

## 🚀 Deployment Steps

### Step 1: Copy Project Files
```bash
# Navigate to your web server document root
cd /path/to/your/webserver/root

# Create project directory
mkdir sarvinoz-portfolio
cd sarvinoz-portfolio

# Copy all files from deploy folder
cp -r /path/to/project/deploy/* .
```

### Step 2: Set Directory Permissions
```bash
# Create required directories
mkdir -p videos/thumbnails
mkdir -p data

# Set proper permissions
chmod 755 api/
chmod 777 videos/
chmod 777 data/
chmod 644 api/upload-video.php
chmod 644 *.html *.css *.js
```

### Step 3: Configure Environment Variables
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your Supabase credentials
nano .env
```

Update `.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./videos/
```

### Step 4: Update Configuration Files
Edit `js/supabase-config.js`:
```javascript
// Replace with your actual Supabase credentials
this.supabaseUrl = 'https://your-project-id.supabase.co';
this.supabaseKey = 'your-anon-key-here';
```

### Step 5: Start Web Server
```bash
# XAMPP/WAMP/MAMP: Start through control panel

# Apache (if installed separately)
sudo systemctl start apache2

# PHP built-in server (for testing)
php -S localhost:8000
```

### Step 6: Configure Virtual Host (Optional)
Create Apache virtual host:
```apache
<VirtualHost *:80>
    ServerName sarvinoz.local
    DocumentRoot /path/to/sarvinoz-portfolio
    <Directory /path/to/sarvinoz-portfolio>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Add to `/etc/hosts`:
```
127.0.0.1 sarvinoz.local
```

## ✅ Post-Deployment Verification

### Step 1: Basic Functionality Tests
```bash
# Test web server response
curl -I http://localhost:8000/seconss.html
# Expected: HTTP/200 OK

# Test PHP functionality
curl -I http://localhost:8000/api/upload-video.php
# Expected: HTTP/405 Method Not Allowed (correct for GET request)
```

### Step 2: Website Health Checks

#### A. Frontend Tests
- [ ] Website loads at `http://localhost:8000/seconss.html`
- [ ] Hero section displays with image
- [ ] Navigation menu functions
- [ ] Language switcher works
- [ ] Portfolio section loads
- [ ] Video previews play on hover
- [ ] Contact section displays
- [ ] Responsive design works on mobile

#### B. Admin Interface Tests
- [ ] Admin panel opens (⚙️ button)
- [ ] Upload interface displays
- [ ] File drag & drop works
- [ ] Photo upload to Supabase functions
- [ ] Video upload to server works
- [ ] Media management interface works

#### C. Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Images load with lazy loading
- [ ] Animations run smoothly
- [ ] Cursor responsiveness good
- [ ] No console errors

### Step 3: Database Connectivity
```javascript
// Test in browser console
const { createClient } = supabase;
const client = createClient('your-url', 'your-key');
client.from('portfolio_items').select('*').then(console.log);
```

### Step 4: Upload System Testing
1. **Photo Upload Test**:
   - Upload various image formats (JPEG, PNG, WebP)
   - Verify files appear in Supabase storage
   - Check database records created
   - Confirm thumbnails generated

2. **Video Upload Test**:
   - Upload MP4 video file
   - Verify file saved to `/videos/` directory
   - Check video plays in portfolio section
   - Confirm metadata saved

## 📊 Monitoring & Logging

### Local Monitoring Setup
1. **Error Logs**:
   ```bash
   # Apache error log
   tail -f /var/log/apache2/error.log
   
   # PHP error log
   tail -f /var/log/php_errors.log
   ```

2. **Browser Console**:
   - Monitor JavaScript errors
   - Check network requests
   - Verify API responses

3. **File System Monitoring**:
   ```bash
   # Check upload directory
   ls -la videos/
   
   # Monitor disk usage
   du -sh videos/
   ```

## 🚨 Rollback Plan

### If Issues Arise:
1. **Backup Current State**:
   ```bash
   cp -r sarvinoz-portfolio sarvinoz-portfolio-backup
   ```

2. **Restore Previous Version**:
   ```bash
   rm -rf sarvinoz-portfolio
   git checkout previous-working-commit
   ```

3. **Database Rollback**:
   ```sql
   -- Drop and recreate table if needed
   DROP TABLE portfolio_items;
   -- Re-run setup SQL
   ```

4. **Clear Cache**:
   ```bash
   # Clear browser cache
   # Restart web server
   sudo systemctl restart apache2
   ```

## ⏱️ Timeline & Dependencies

### Estimated Duration: 2-3 hours
- **Environment Setup**: 30-45 minutes
- **Supabase Configuration**: 30 minutes
- **File Deployment**: 15 minutes
- **Testing & Verification**: 60-90 minutes

### Required Team Members:
- **Developer**: For configuration and testing
- **Optional - DBA**: For database setup assistance

### Dependencies:
- Internet connection for Supabase
- Local web server with PHP support
- Modern web browser for testing
- Supabase account and project

## ⚠️ Potential Risks & Mitigation

### Risk 1: Supabase Connection Issues
- **Mitigation**: Test API keys before deployment
- **Fallback**: Use local JSON storage temporarily

### Risk 2: PHP Upload Failures
- **Mitigation**: Verify directory permissions and PHP settings
- **Fallback**: Disable upload feature until resolved

### Risk 3: Performance Issues
- **Mitigation**: Test with sample media files
- **Fallback**: Implement progressive loading

### Risk 4: Cross-Browser Compatibility
- **Mitigation**: Test in Chrome, Firefox, Safari, Edge
- **Fallback**: Provide browser-specific fallbacks

## 🎯 Success Criteria

✅ **Deployment Successful When**:
- Website loads without errors
- All sections display correctly
- Admin upload system functions
- Photos save to Supabase
- Videos save to local server
- Portfolio filtering works
- Mobile responsiveness confirmed
- Performance benchmarks met

## 📞 Support & Troubleshooting

### Common Issues:
1. **500 Internal Server Error**: Check PHP error logs, verify permissions
2. **Supabase Connection Failed**: Verify API keys and network
3. **Upload Fails**: Check file size limits and directory permissions
4. **Images Not Loading**: Verify Supabase bucket policies
5. **JavaScript Errors**: Check library loading and browser console

### Debug Commands:
```bash
# Check web server status
systemctl status apache2

# Test PHP configuration
php -m | grep -E "(curl|json|fileinfo)"

# Verify file permissions
ls -la api/ videos/

# Test Supabase connectivity
curl -H "apikey: your-key" "https://your-project.supabase.co/rest/v1/"
```

---

**🎉 Once deployed successfully, your website will be accessible at:**
- **Primary URL**: `http://localhost:8000/seconss.html`
- **Admin Interface**: Click the ⚙️ button for media uploads
- **Portfolio Management**: Full CRUD operations for photos and videos

**Next Steps**: After successful local deployment, you can consider cloud deployment to platforms like Netlify, Vercel, or your preferred hosting provider.
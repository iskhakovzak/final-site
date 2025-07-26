// ===== MEDIA UPLOAD SYSTEM =====

class MediaUploadManager {
    constructor() {
        this.supabaseManager = new SupabaseManager();
        this.maxFileSize = 50 * 1024 * 1024; // 50MB
        this.allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        this.allowedVideoTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/avi'];
        this.uploadQueue = [];
        this.isUploading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createUploadInterface();
        this.loadExistingMedia();
    }

    setupEventListeners() {
        // File input change
        document.addEventListener('change', (e) => {
            if (e.target.matches('.file-input')) {
                this.handleFileSelection(e);
            }
        });

        // Drag and drop
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (e.target.matches('.upload-zone')) {
                e.target.classList.add('drag-over');
            }
        });

        document.addEventListener('dragleave', (e) => {
            if (e.target.matches('.upload-zone')) {
                e.target.classList.remove('drag-over');
            }
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.matches('.upload-zone')) {
                e.target.classList.remove('drag-over');
                this.handleFileDrop(e);
            }
        });

        // Upload button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.upload-btn')) {
                this.processUploadQueue();
            }
            if (e.target.matches('.remove-file-btn')) {
                this.removeFileFromQueue(e.target.dataset.index);
            }
            if (e.target.matches('.delete-media-btn')) {
                this.deleteMedia(e.target.dataset.id, e.target.dataset.path);
            }
        });
    }

    createUploadInterface() {
        const uploadInterface = `
            <div class="media-upload-interface" style="display: none;">
                <div class="upload-container">
                    <h2>Upload Media</h2>
                    
                    <div class="upload-tabs">
                        <button class="tab-btn active" data-tab="photos">Photos</button>
                        <button class="tab-btn" data-tab="videos">Videos</button>
                    </div>

                    <div class="upload-section" id="photos-upload">
                        <div class="upload-zone" data-type="photo">
                            <div class="upload-icon">📷</div>
                            <p>Drag & drop photos here or click to browse</p>
                            <p class="upload-info">Supports: JPEG, PNG, WebP, GIF (Max: 50MB each)</p>
                            <input type="file" class="file-input" accept="image/*" multiple>
                        </div>
                    </div>

                    <div class="upload-section" id="videos-upload" style="display: none;">
                        <div class="upload-zone" data-type="video">
                            <div class="upload-icon">🎥</div>
                            <p>Drag & drop videos here or click to browse</p>
                            <p class="upload-info">Supports: MP4, WebM, MOV, AVI (Max: 50MB each)</p>
                            <input type="file" class="file-input" accept="video/*" multiple>
                        </div>
                    </div>

                    <div class="upload-queue" id="upload-queue"></div>

                    <div class="upload-actions">
                        <button class="btn btn-primary upload-btn" disabled>Upload Selected Files</button>
                        <button class="btn btn-secondary clear-queue-btn">Clear Queue</button>
                    </div>

                    <div class="upload-progress" id="upload-progress" style="display: none;">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="progress-text">Uploading... 0%</div>
                    </div>
                </div>

                <div class="media-management">
                    <h3>Manage Media</h3>
                    <div class="existing-media" id="existing-media"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', uploadInterface);

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.upload-section').forEach(s => s.style.display = 'none');
                
                btn.classList.add('active');
                document.getElementById(`${btn.dataset.tab}-upload`).style.display = 'block';
            });
        });

        // Clear queue button
        document.querySelector('.clear-queue-btn').addEventListener('click', () => {
            this.clearUploadQueue();
        });

        // Upload zone click to trigger file input
        document.querySelectorAll('.upload-zone').forEach(zone => {
            zone.addEventListener('click', () => {
                zone.querySelector('.file-input').click();
            });
        });
    }

    handleFileSelection(event) {
        const files = Array.from(event.target.files);
        this.addFilesToQueue(files);
    }

    handleFileDrop(event) {
        const files = Array.from(event.dataTransfer.files);
        this.addFilesToQueue(files);
    }

    addFilesToQueue(files) {
        files.forEach(file => {
            if (this.validateFile(file)) {
                const fileData = {
                    file: file,
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    type: file.type.startsWith('image/') ? 'photo' : 'video',
                    preview: null,
                    metadata: {
                        title: file.name.split('.')[0],
                        category: file.type.startsWith('image/') ? 'photo' : 'video',
                        description: '',
                        tags: [],
                        featured: false
                    }
                };

                // Create preview
                this.createFilePreview(fileData);
                this.uploadQueue.push(fileData);
            }
        });

        this.updateUploadQueue();
        this.updateUploadButton();
    }

    validateFile(file) {
        // Check file size
        if (file.size > this.maxFileSize) {
            this.showNotification(`File "${file.name}" is too large. Maximum size is 50MB.`, 'error');
            return false;
        }

        // Check file type
        const isValidImage = this.allowedImageTypes.includes(file.type);
        const isValidVideo = this.allowedVideoTypes.includes(file.type);

        if (!isValidImage && !isValidVideo) {
            this.showNotification(`File "${file.name}" has an unsupported format.`, 'error');
            return false;
        }

        return true;
    }

    createFilePreview(fileData) {
        if (fileData.type === 'photo') {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileData.preview = e.target.result;
                this.updateUploadQueue();
            };
            reader.readAsDataURL(fileData.file);
        } else {
            // For videos, we'll use a placeholder or generate a thumbnail
            fileData.preview = '/placeholder-video.png';
        }
    }

    updateUploadQueue() {
        const queueContainer = document.getElementById('upload-queue');
        
        if (this.uploadQueue.length === 0) {
            queueContainer.innerHTML = '<p class="empty-queue">No files selected</p>';
            return;
        }

        const queueHTML = this.uploadQueue.map((fileData, index) => `
            <div class="queue-item" data-id="${fileData.id}">
                <div class="queue-preview">
                    ${fileData.preview ? 
                        `<img src="${fileData.preview}" alt="Preview">` : 
                        '<div class="preview-placeholder">📄</div>'
                    }
                </div>
                <div class="queue-info">
                    <input type="text" class="file-title" value="${fileData.metadata.title}" 
                           placeholder="Enter title" data-index="${index}">
                    <input type="text" class="file-description" value="${fileData.metadata.description}" 
                           placeholder="Enter description" data-index="${index}">
                    <select class="file-category" data-index="${index}">
                        <option value="photo" ${fileData.metadata.category === 'photo' ? 'selected' : ''}>Photo</option>
                        <option value="video" ${fileData.metadata.category === 'video' ? 'selected' : ''}>Video</option>
                        <option value="editorial">Editorial</option>
                        <option value="commercial">Commercial</option>
                        <option value="runway">Runway</option>
                        <option value="beauty">Beauty</option>
                    </select>
                    <div class="file-size">${this.formatFileSize(fileData.size)}</div>
                </div>
                <div class="queue-actions">
                    <label class="featured-checkbox">
                        <input type="checkbox" ${fileData.metadata.featured ? 'checked' : ''} data-index="${index}">
                        Featured
                    </label>
                    <button class="remove-file-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        `).join('');

        queueContainer.innerHTML = queueHTML;

        // Add event listeners for metadata inputs
        queueContainer.querySelectorAll('.file-title, .file-description, .file-category').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.classList.contains('file-title') ? 'title' :
                             e.target.classList.contains('file-description') ? 'description' : 'category';
                this.uploadQueue[index].metadata[field] = e.target.value;
            });
        });

        queueContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.uploadQueue[index].metadata.featured = e.target.checked;
            });
        });
    }

    removeFileFromQueue(index) {
        this.uploadQueue.splice(index, 1);
        this.updateUploadQueue();
        this.updateUploadButton();
    }

    clearUploadQueue() {
        this.uploadQueue = [];
        this.updateUploadQueue();
        this.updateUploadButton();
    }

    updateUploadButton() {
        const uploadBtn = document.querySelector('.upload-btn');
        uploadBtn.disabled = this.uploadQueue.length === 0 || this.isUploading;
        uploadBtn.textContent = this.isUploading ? 'Uploading...' : `Upload ${this.uploadQueue.length} file(s)`;
    }

    async processUploadQueue() {
        if (this.isUploading || this.uploadQueue.length === 0) return;

        this.isUploading = true;
        this.updateUploadButton();
        this.showUploadProgress();

        const total = this.uploadQueue.length;
        let completed = 0;

        for (const fileData of this.uploadQueue) {
            try {
                let result;
                
                if (fileData.type === 'photo') {
                    // Upload photo to Supabase
                    result = await this.supabaseManager.uploadPhoto(fileData.file);
                    if (result.success) {
                        // Save metadata to database
                        const photoData = {
                            ...fileData.metadata,
                            url: result.url,
                            thumbnail: result.url + '?w=400&h=300&fit=crop'
                        };
                        await this.supabaseManager.savePhotoMetadata(photoData);
                    }
                } else {
                    // Upload video to local server
                    result = await this.uploadVideoToServer(fileData);
                }

                if (result.success) {
                    this.showNotification(`Successfully uploaded ${fileData.name}`, 'success');
                } else {
                    this.showNotification(`Failed to upload ${fileData.name}: ${result.error}`, 'error');
                }
            } catch (error) {
                this.showNotification(`Error uploading ${fileData.name}: ${error.message}`, 'error');
            }

            completed++;
            this.updateProgressBar((completed / total) * 100);
        }

        // Reset upload state
        this.isUploading = false;
        this.clearUploadQueue();
        this.hideUploadProgress();
        this.loadExistingMedia(); // Refresh media list
        this.showNotification('Upload completed!', 'success');
    }

    async uploadVideoToServer(fileData) {
        try {
            const formData = new FormData();
            formData.append('video', fileData.file);
            formData.append('metadata', JSON.stringify(fileData.metadata));

            const response = await fetch('/api/upload-video', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return { success: true, ...result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    showUploadProgress() {
        document.getElementById('upload-progress').style.display = 'block';
    }

    hideUploadProgress() {
        document.getElementById('upload-progress').style.display = 'none';
    }

    updateProgressBar(percentage) {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `Uploading... ${Math.round(percentage)}%`;
    }

    async loadExistingMedia() {
        try {
            const result = await this.supabaseManager.getPortfolioItems();
            if (result.success) {
                this.displayExistingMedia(result.data);
            }
        } catch (error) {
            console.error('Failed to load existing media:', error);
        }
    }

    displayExistingMedia(mediaItems) {
        const container = document.getElementById('existing-media');
        
        if (!mediaItems || mediaItems.length === 0) {
            container.innerHTML = '<p class="no-media">No media uploaded yet</p>';
            return;
        }

        const mediaHTML = mediaItems.map(item => `
            <div class="media-item" data-id="${item.id}">
                <div class="media-thumbnail">
                    ${item.type === 'photo' ? 
                        `<img src="${item.thumbnail || item.image}" alt="${item.title}">` :
                        `<video src="${item.video}" muted></video>`
                    }
                </div>
                <div class="media-info">
                    <h4>${item.title}</h4>
                    <p>${item.category} • ${item.year}</p>
                    <p class="media-description">${item.description || 'No description'}</p>
                </div>
                <div class="media-actions">
                    <button class="btn btn-small edit-media-btn" data-id="${item.id}">Edit</button>
                    <button class="btn btn-small btn-danger delete-media-btn" 
                            data-id="${item.id}" data-path="${item.image || item.video}">Delete</button>
                </div>
            </div>
        `).join('');

        container.innerHTML = mediaHTML;
    }

    async deleteMedia(itemId, filePath) {
        if (!confirm('Are you sure you want to delete this media item?')) return;

        try {
            const result = await this.supabaseManager.deletePhoto(itemId, filePath);
            if (result.success) {
                this.showNotification('Media deleted successfully', 'success');
                this.loadExistingMedia();
            } else {
                this.showNotification(`Failed to delete media: ${result.error}`, 'error');
            }
        } catch (error) {
            this.showNotification(`Error deleting media: ${error.message}`, 'error');
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Public methods
    showUploadInterface() {
        document.querySelector('.media-upload-interface').style.display = 'block';
    }

    hideUploadInterface() {
        document.querySelector('.media-upload-interface').style.display = 'none';
    }
}

// Initialize upload manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mediaUploadManager = new MediaUploadManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MediaUploadManager;
} else {
    window.MediaUploadManager = MediaUploadManager;
}
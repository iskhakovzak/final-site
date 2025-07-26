<?php
// ===== VIDEO UPLOAD API ENDPOINT =====

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Configuration
$uploadDir = '../videos/';
$maxFileSize = 50 * 1024 * 1024; // 50MB
$allowedTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/avi'];

// Create upload directory if it doesn't exist
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create upload directory']);
        exit();
    }
}

// Check if file was uploaded
if (!isset($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No video file uploaded or upload error occurred']);
    exit();
}

$file = $_FILES['video'];
$metadata = isset($_POST['metadata']) ? json_decode($_POST['metadata'], true) : [];

// Validate file size
if ($file['size'] > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File size exceeds maximum limit of 50MB']);
    exit();
}

// Validate file type
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Allowed types: MP4, WebM, MOV, AVI']);
    exit();
}

// Generate unique filename
$fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid() . '_' . time() . '.' . strtolower($fileExtension);
$filepath = $uploadDir . $filename;

// Move uploaded file
if (!move_uploaded_file($file['tmp_name'], $filepath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
    exit();
}

// Generate video thumbnail (requires FFmpeg)
$thumbnailPath = generateVideoThumbnail($filepath, $uploadDir);

// Save video metadata to database/JSON file
$videoData = [
    'id' => uniqid(),
    'filename' => $filename,
    'original_name' => $file['name'],
    'path' => $filepath,
    'url' => '/videos/' . $filename,
    'thumbnail' => $thumbnailPath ? '/videos/thumbnails/' . basename($thumbnailPath) : null,
    'size' => $file['size'],
    'type' => $file['type'],
    'uploaded_at' => date('Y-m-d H:i:s'),
    'metadata' => $metadata
];

// Save to JSON database (you might want to use a real database)
$dbFile = '../data/videos.json';
$videos = [];

if (file_exists($dbFile)) {
    $videos = json_decode(file_get_contents($dbFile), true) ?: [];
}

$videos[] = $videoData;

if (!file_put_contents($dbFile, json_encode($videos, JSON_PRETTY_PRINT))) {
    // File saved but database update failed
    error_log('Failed to update video database');
}

// Return success response
echo json_encode([
    'success' => true,
    'id' => $videoData['id'],
    'url' => $videoData['url'],
    'thumbnail' => $videoData['thumbnail'],
    'message' => 'Video uploaded successfully'
]);

function generateVideoThumbnail($videoPath, $uploadDir) {
    // Check if FFmpeg is available
    $ffmpegPath = '/usr/bin/ffmpeg'; // Adjust path as needed
    
    if (!file_exists($ffmpegPath)) {
        return null;
    }
    
    $thumbnailDir = $uploadDir . 'thumbnails/';
    if (!is_dir($thumbnailDir)) {
        mkdir($thumbnailDir, 0755, true);
    }
    
    $thumbnailFilename = pathinfo($videoPath, PATHINFO_FILENAME) . '_thumb.jpg';
    $thumbnailPath = $thumbnailDir . $thumbnailFilename;
    
    // Generate thumbnail at 2 second mark
    $command = sprintf(
        '%s -i %s -ss 00:00:02 -vframes 1 -q:v 2 %s 2>&1',
        escapeshellarg($ffmpegPath),
        escapeshellarg($videoPath),
        escapeshellarg($thumbnailPath)
    );
    
    exec($command, $output, $returnCode);
    
    if ($returnCode === 0 && file_exists($thumbnailPath)) {
        return $thumbnailPath;
    }
    
    return null;
}

// Error handler for unexpected errors
function handleError($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
    exit();
}

set_error_handler('handleError');
?>
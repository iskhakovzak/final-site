import os
import requests
from PIL import Image
from io import BytesIO

# Configuration
# Replace with the actual base URL from which the images are served
BASE_URL = "https://ik.imagekit.io/sarvinozusmanova/"
# Replace with the local directory where you want to save the images
IMAGE_DIR = "new/img"
# A list of image paths to optimize, relative to the BASE_URL
# This list would be populated by scraping the HTML or from a database
IMAGE_PATHS = [
    "New%20Folder/IMG_4975.JPG?updatedAt=1752757683245",
    "New%20Folder/IMG_9969.WEBP?updatedAt=1752757438569",
    "New%20Folder/IMG_9959.WEBP?updatedAt=1752757438569",
    "New%20Folder/IMG_9961.WEBP?updatedAt=1752757438569",
    "IMG_9222.JPG?updatedAt=1752775340702",
    "IMG_9956.WEBP?updatedAt=1752775340702",
    "IMG_6457.JPG?updatedAt=1752775340702",
    "IMG_9951.WEBP?updatedAt=1752775340702",
    "IMG_9953.WEBP?updatedAt=1752775340702",
    "IMG_9215.JPG?updatedAt=1752775340702",
    "IMG_6577.JPG?updatedAt=1752775340702",
    "IMG_6493.JPG?updatedAt=1752775340702",
    "IMG_6444.JPG?updatedAt=1752775340702",
    "IMG_5784.JPG?updatedAt=1752775340702",
    "IMG_5376.JPG?updatedAt=1752775340702",
    "IMG_5375.JPG?updatedAt=1752775340702",
    "IMG_5373.JPG?updatedAt=1752775340702",
    "IMG_4992.JPG?updatedAt=1752775340702",
    "IMG_4987.JPG?updatedAt=1752775340702",
    "IMG_4990.JPG?updatedAt=1752775340702",
    "IMG_4985.JPG?updatedAt=1752775340702",
    "IMG_3603.JPG?updatedAt=1752775340702",
    "IMG_3619.JPG?updatedAt=1752775340702",
    "IMG_3630.JPG?updatedAt=1752775340702",
    "IMG_3494.JPG?updatedAt=1752775340702",
    "IMG_3631.jpg?updatedAt=1752775340702",
    "IMG_1122.JPG?updatedAt=1752775340702",
    "IMG_1820.JPG?updatedAt=1752775340702",
    "IMG_3007.JPG?updatedAt=1752775340702",
    "IMG_1817.JPG?updatedAt=1752775340702",
    "IMG_1336.JPG?updatedAt=1752775340702",
    "IMG_1106.JPG?updatedAt=1752775340702",
    "IMG_0168.JPG?updatedAt=1752775340702",
    "IMG_0683.JPG?updatedAt=1752775340702",
    "IMG_0679.JPG?updatedAt=1752775340702",
    "IMG_0904.JPG?updatedAt=1752775340702",
    "IMG_0677.JPG?updatedAt=1752775340702",
    "IMG_1101.JPG?updatedAt=1752775340702",
    "New%20Folder/IMG_0903.JPG?updatedAt=1752757354149",
    "New%20Folder/FullSizeRender.jpg?updatedAt=1752757343020",
    "New%20Folder/IMG_1101.JPG?updatedAt=1752757357793",
    "New%20Folder/IMG_0677.JPG?updatedAt=1752757360088",
    "New%20Folder/IMG_1106.JPG?updatedAt=1752757375871",
    "New%20Folder/IMG_1336.JPG?updatedAt=1752757378979",
    "New%20Folder/IMG_1729.HEIC?updatedAt=1752757384577",
    "New%20Folder/IMG_1817.JPG?updatedAt=1752757381455",
    "New%20Folder/IMG_2948.HEIC?updatedAt=1752757388930",
    "New%20Folder/IMG_1122.JPG?updatedAt=1752757399457",
    "New%20Folder/IMG_3070.HEIC?updatedAt=1752757401858",
    "New%20Folder/IMG_3631.jpg?updatedAt=1752757405299",
    "New%20Folder/IMG_3494.JPG?updatedAt=1752757408182",
    "New%20Folder/IMG_4990.JPG?updatedAt=1752757414610",
    "New%20Folder/IMG_5376.JPG?updatedAt=1752757420282",
    "New%20Folder/IMG_5784.JPG?updatedAt=1752757421773",
    "New%20Folder/IMG_9215.JPG?updatedAt=1752757430821",
    "New%20Folder/IMG_9961.WEBP?updatedAt=1752757438569",
    "New%20Folder/IMG_1338.JPG?updatedAt=1752757450546",
    "New%20Folder/IMG_6493.JPG?updatedAt=1752757426255",
    "New%20Folder/IMG_0902.JPG?updatedAt=1752757349686",
]

def download_image(url, save_path):
    """Downloads an image from a URL and saves it to a local path."""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error downloading {url}: {e}")
        return False

def optimize_image(image_path, quality=85, format='WEBP'):
    """Optimizes an image and saves it in the specified format."""
    try:
        img = Image.open(image_path)
        # Convert HEIC to a supported format first
        if img.format == 'HEIF':
            # This requires pillow-heif to be installed
            img = Image.open(image_path)

        output_path = os.path.splitext(image_path)[0] + f".{format.lower()}"
        img.save(output_path, format=format, quality=quality)
        return output_path
    except Exception as e:
        print(f"Error optimizing {image_path}: {e}")
        return None

def main():
    """Main function to download and optimize images."""
    if not os.path.exists(IMAGE_DIR):
        os.makedirs(IMAGE_DIR)

    for image_path in IMAGE_PATHS:
        # Construct the full URL
        # The URL encoding is already handled in the path string
        image_url = BASE_URL + image_path

        # Determine a safe local filename
        # We'll replace special characters to avoid filesystem issues
        local_filename = os.path.basename(image_path.split('?')[0])
        local_filepath = os.path.join(IMAGE_DIR, local_filename)

        print(f"Processing {image_url}...")
        if download_image(image_url, local_filepath):
            print(f"Downloaded to {local_filepath}")
            optimized_path = optimize_image(local_filepath)
            if optimized_path:
                print(f"Optimized and saved to {optimized_path}")
            else:
                print("Optimization failed.")
        else:
            print("Download failed.")
        print("-" * 20)

if __name__ == "__main__":
    main()

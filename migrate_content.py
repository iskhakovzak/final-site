import os
from bs4 import BeautifulSoup
from sanity_client import client

# Configuration
HTML_FILE = "new/index.html"
SANITY_DATASET = "production"

def get_portfolio_items(soup):
    """Parses the HTML to extract portfolio items."""
    items = []
    portfolio_grid = soup.find('div', class_='portfolio-grid')
    if not portfolio_grid:
        return items

    for item in portfolio_grid.find_all('div', class_='portfolio-item'):
        category = item.get('data-category')
        image_tag = item.find('img')
        video_tag = item.find('video')
        label_tag = item.find('div', class_='portfolio-label')

        if image_tag:
            items.append({
                '_type': 'portfolio',
                'title': image_tag.get('alt', ''),
                'category': category,
                'image': {
                    '_type': 'image',
                    'asset': {
                        '_type': 'reference',
                        '_ref': f"image-{image_tag['src'].split('/')[-1].split('?')[0]}"
                    }
                },
                'label': label_tag.text if label_tag else ''
            })
        elif video_tag:
            items.append({
                '_type': 'portfolio',
                'title': video_tag.get('aria-label', ''),
                'category': category,
                'video': {
                    '_type': 'file',
                    'asset': {
                        '_type': 'reference',
                        '_ref': f"file-{video_tag['src'].split('/')[-1].split('?')[0]}"
                    }
                },
                'label': label_tag.text if label_tag else ''
            })
    return items

def main():
    """Main function to migrate content."""
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    portfolio_items = get_portfolio_items(soup)

    for item in portfolio_items:
        try:
            client.create(item)
            print(f"Successfully created document for: {item.get('title')}")
        except Exception as e:
            print(f"Error creating document for: {item.get('title')}")
            print(e)

if __name__ == "__main__":
    main()

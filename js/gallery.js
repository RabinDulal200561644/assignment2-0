class Gallery {
    constructor(images) {
        this.images = images;
        this.currentIndex = 0;
        this.featuredImage = document.getElementById('featured');
        this.caption = document.getElementById('caption');
        this.thumbnailsList = document.getElementById('thumbnails');

        this.init();
    }

    init() {
        this.loadThumbnails();
        this.updateFeaturedImage();

        document.getElementById('prev').addEventListener('click', () => this.showPreviousImage());
        document.getElementById('next').addEventListener('click', () => this.showNextImage());
    }

    setActiveThumbnail(index) {
        const thumbnails = this.thumbnailsList.querySelectorAll('img');
        thumbnails.forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === index);
        });
    }

    loadThumbnails() {
        this.images.forEach((image, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = image.thumb;
            img.alt = `Thumbnail ${index + 1}`;
            img.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateFeaturedImage();
            });
            li.appendChild(img);
            this.thumbnailsList.appendChild(li);
        });
    }

    updateFeaturedImage() {
        const currentImage = this.images[this.currentIndex];
        this.featuredImage.src = currentImage.full;
        this.caption.textContent = currentImage.description;
        this.featuredImage.style.borderColor = currentImage.color;
        this.caption.style.color = currentImage.color;
        this.setActiveThumbnail(this.currentIndex);
    }

    showPreviousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateFeaturedImage();
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateFeaturedImage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { full: 'images/flowers-pink-large.jpg', thumb: 'images/flowers-pink-small.jpg', description: 'Pink Flowers', color: '#e4007c' },
        { full: 'images/flowers-red-large.jpg', thumb: 'images/flowers-red-small.jpg', description: 'Red Flowers', color: '#FF0000' },
        { full: 'images/flowers-white-large.jpg', thumb: 'images/flowers-white-small.jpg', description: 'White Flowers', color: '#F5F5F5' },
        { full: 'images/flowers-purple-large.jpg', thumb: 'images/flowers-purple-small.jpg', description: 'Purple Flowers', color: '#800080' },
        { full: 'images/flowers-yellow-large.jpg', thumb: 'images/flowers-yellow-small.jpg', description: 'Yellow Flowers', color: '#FFFF00' }
    ];

    new Gallery(images);
});

const wrapper = document.querySelector(".wrapper");
const leftPanel = document.querySelector(".leftPanel");
const rightPanel = document.querySelector(".rightPanel");
const increment = document.querySelector(".increment");
const decrement = document.querySelector(".decrement");

let imageObjects = {};

window.onload = async function () {
    await createImageObject();
    createCards();
};

async function createImageObject() {
    const data = await fetchImageData();
    imageObjects = data.photos.map(image => {
        return {
            description: image.alt || '',
            color: image.avg_color || '',
            userName: image.photographer || '',
            imageUrl: image.src.portrait || ''
        };
    });
}

function createCards() {
    imageObjects.forEach((item) => {
        const leftItems = document.createElement("div");
        const rightItems = document.createElement("div");
        const description = document.createElement("h1");
        const userName = document.createElement("p");

        leftItems.classList.add("textPanel");
        rightItems.classList.add("imagePanel");

        description.innerText = item.description;
        userName.innerText = item.userName;

        leftItems.appendChild(description);
        leftItems.appendChild(userName);
        leftItems.style.background = item.color;
        leftItems.style.color = "#fff";

        rightItems.style.backgroundImage = `url(${item.imageUrl})`;

        leftPanel.appendChild(leftItems);
        rightPanel.appendChild(rightItems);
    });
}

let currentIndex = 0;
decrement.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imageObjects.length - 1;
    }
    updateImageSlides();
});

increment.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex > imageObjects.length - 1) {
        currentIndex = 0;
    }
    updateImageSlides();
});

function updateImageSlides() {
    rightPanel.style.transform = `translateY(-${currentIndex * 100}%)`;
    leftPanel.style.transform = `translateY(-${currentIndex * 100}%)`;
}

// async function fetchImageData() {
//     try {
//         const response = await fetch("/api/getImages");
//         const data = await response.json();
//         if (data != null) { return data; }
//     } catch (error) {
//         console.error(error);
//     }
// }

async function fetchImageData() {
    try {
        const response = await fetch("/api/getPexelsImages");
        const data = await response.json();
        if (data != null) { return data; }
    } catch (error) {
        console.error(error);
    }
}


// Calculate relative luminance of a color
function calculateRelativeLuminance(color) {
    const normalizedColor = color.map(component => {
        component /= 255;
        return component <= 0.03928 ? component / 12.92 : Math.pow((component + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * normalizedColor[0] + 0.7152 * normalizedColor[1] + 0.0722 * normalizedColor[2];
}

// Determine whether to use light or dark text color based on background color
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const bgColor = [r, g, b];

    const luminance = calculateRelativeLuminance(bgColor);
    return luminance > 0.5 ? "#000000" : "#ffffff";
}
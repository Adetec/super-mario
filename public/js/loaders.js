const loadImage = (url) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener('load', ()=> {
            resolve(image);
            console.log('Image loaded');
        });
        image.src = url;
    });
}

const loadLevel = (level) => {
    return fetch(`./levels/${level}.json`).then(r => r.json());
}

export {loadImage, loadLevel};
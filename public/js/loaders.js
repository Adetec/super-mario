const loadImage = (url) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener('load', ()=> {
            setTimeout(() => {
                resolve(image);
                console.log('Image loaded',image);
            }, 2000);
        });
        image.src = url;
    });
}

const loadLevel = (level) => {
    return fetch(`./levels/${level}.json`).then(r => r.json()).then(json => {
        return new Promise(resolve => setTimeout(() => {
            resolve(json);
            console.log('Json loaded', json);
        }, 3000))
    });
}

export {loadImage, loadLevel};
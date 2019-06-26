const loadImage = (url) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener('load', ()=> {
            resolve(image);
            console.log('Resolved');
        });
        image.src = url;
    });
}

export {loadImage}
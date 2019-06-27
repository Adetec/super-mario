import SpriteSheet from './sprite-sheet.js';
import {loadImage, loadLevel} from './loaders.js';
// Get the game canvas element
const canvas = document.getElementById('game-cv');
const context = canvas.getContext('2d');

// Draw background
const drawBackground = (background, context, sprites )=>{
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);  
            }
        }        
    });
}

const loadBackgroundSprites = () => {
    return loadImage('/images/tiles.png').then(image => {
        // Image source: https://www.spriters-resource.com/download/52571/
        const sprites = new SpriteSheet(image, 16,16);
        sprites.define('ground', 0, 0);
        sprites.define('sky', 3, 23);
        return sprites;
    });
    
}


Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([sprites, level]) => {
    level.backgrounds.forEach(background => {
        drawBackground(background, context, sprites); 
    });
});
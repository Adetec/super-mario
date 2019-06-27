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
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}

const loadMarioSprites = () => {
    return loadImage('/images/characters.gif').then(image => {
        // Image source: http://www.mariouniverse.com/wp-content/img/sprites/nes/smb/characters.gif
        const sprites = new SpriteSheet(image, 16,16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
    });
}

Promise.all([
    loadBackgroundSprites(),
    loadMarioSprites(),
    loadLevel('1-1')
]).then(([sprites, marioSprite, level]) => {
    level.backgrounds.forEach(background => {
        drawBackground(background, context, sprites); 
    });

    marioSprite.draw('idle', context, 64, 64);
});
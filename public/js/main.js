import SpriteSheet from './sprite-sheet.js';
import {loadImage} from './loaders.js';
// Get the game canvas element
const canvas = document.getElementById('game-cv');
const context = canvas.getContext('2d');

// context.fillRect(0, 0, 50, 50);




loadImage('/images/tiles.png').then(image => {
    // Image source: https://www.spriters-resource.com/download/52571/
    const sprites = new SpriteSheet(image, 16,16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);
    for (let x = 0; x < 25; x++) {
        for (let y = 0; y < 14; y++) {
            sprites.draw('sky', context, x * 16, y * 16);
            
        }
        
    }
});
import {loadLevel} from './loaders.js';
import {loadBackgroundSprites, loadMarioSprites} from './sprites.js';
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
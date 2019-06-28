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

class Compositor {
    constructor() {
        this. layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer(context);
        });
    }
}

const createBackgroundLayer = (backgrounds, sprites) => {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites); 
    });
    const drawBackgroundLayer = () => {
        context.drawImage(buffer, 0, 0);
    }
    return drawBackgroundLayer;
    /* return () => {
        context.drawImage(buffer, 0, 0);
    }; */
}

const createSpriteLayer = (sprite, pos) => {
    const drawSpriteLayer = (context) => {
        sprite.draw('idle', context, pos.x, pos.y);
    }
    return drawSpriteLayer;

    /* return (context) => {
    sprite.draw('idle', context, pos.x, pos.y);
    } */
}


Promise.all([
    loadBackgroundSprites(),
    loadMarioSprites(),
    loadLevel('1-1')
]).then(([sprites, marioSprite, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
    comp.layers.push(backgroundLayer);

    let pos = {
        x: 64,
        y: 64
    }
    const spriteLayer = createSpriteLayer(marioSprite, pos)
    comp.layers.push(spriteLayer);
    console.log(comp.layers);
    let update = () => {
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }

    update();
});
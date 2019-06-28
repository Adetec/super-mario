import {loadLevel} from './loaders.js';
import {loadBackgroundSprites, loadMarioSprites} from './sprites.js';
import Compositor from './compositor.js';
import {createBackgroundLayer} from './layers.js'
// Get the game canvas element
const canvas = document.getElementById('game-cv');
const context = canvas.getContext('2d');

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
]).then(([backgroundSprites, marioSprite, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
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
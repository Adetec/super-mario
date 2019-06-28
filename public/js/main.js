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

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
}

Promise.all([
    loadBackgroundSprites(),
    loadMarioSprites(),
    loadLevel('1-1')
]).then(([backgroundSprites, marioSprite, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer);

    const gravity = 0.5;

    let pos = new Vec2(64, 180);
    let vel = new Vec2(2, -10);
    const spriteLayer = createSpriteLayer(marioSprite, pos)
    comp.layers.push(spriteLayer);
    console.log(comp.layers);
    let update = () => {
        comp.draw(context);
        pos.x += vel.x;
        pos.y += vel.y;
        vel.y += gravity ;
        requestAnimationFrame(update);
    }

    update();
});
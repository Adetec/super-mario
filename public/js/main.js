import {loadLevel} from './loaders.js';
import {loadBackgroundSprites, loadMarioSprites} from './sprites.js';
import Compositor from './compositor.js';
import {createBackgroundLayer} from './layers.js'
// Get the game canvas element
const canvas = document.getElementById('game-cv');
const context = canvas.getContext('2d');

const createSpriteLayer = (entity) => {
    const drawSpriteLayer = (context) => {
        entity.draw(context);
    }
    return drawSpriteLayer;

    /* return (context) => {
    sprite.draw('idle', context, pos.x, pos.y);
    } */
}

class Vec2 {
    constructor(x, y) {
        this.set(x, y)
    }
    
    set(x, y) {
        this.x = x;
        this.y = y
    }
}

class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
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
    const mario = new Entity(64, 180, 2, -10);
    mario.pos.set(64, 180);
    mario.vel.set(2, -10);
    mario.draw = function drawMario(context) {
        marioSprite.draw('idle', context, this.pos.x, this.pos.y);
    }
    mario.update = function updateMario() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    const spriteLayer = createSpriteLayer(mario)
    comp.layers.push(spriteLayer);
    console.log(comp.layers);
    let update = () => {
        comp.draw(context);
        mario.update();
        mario.vel.y += gravity;
        requestAnimationFrame(update);
    }

    update();
});
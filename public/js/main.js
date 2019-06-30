import {loadLevel} from './loaders.js';
import {createMario} from './entities.js'
import {loadBackgroundSprites} from './sprites.js';
import Compositor from './compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';


// Get the game canvas element
const canvas = document.getElementById('game-cv');
const context = canvas.getContext('2d');

Promise.all([
    loadBackgroundSprites(),
    createMario(),
    loadLevel('1-1')
]).then(([backgroundSprites, mario, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer);

    const gravity = 0.5;
    createMario();
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
import Entity from './entity.js';
import {loadMarioSprites} from './sprites.js';
const createMario = () => {
    return loadMarioSprites().then(sprite => {
        const mario = new Entity(64, 180, 2, -10);
        mario.pos.set(64, 180);
        mario.vel.set(2, -10);
        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }
        mario.update = function updateMario() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }
    
        return mario;
    });
}

export {createMario}
import SpriteSheet from './sprite-sheet.js';
import {loadImage} from './loaders.js';

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

export {loadBackgroundSprites, loadMarioSprites};
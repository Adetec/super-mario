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

const createBackgroundLayer = (backgrounds, sprites) => {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites); 
    });
    const drawBackgroundLayer = (context) => {
        context.drawImage(buffer, 0, 0);
    }
    return drawBackgroundLayer;
    /* return () => {
        context.drawImage(buffer, 0, 0);
    }; */
}

const createSpriteLayer = (entity) => {
    const drawSpriteLayer = (context) => {
        entity.draw(context);
    }
    return drawSpriteLayer;

    /* return (context) => {
    sprite.draw('idle', context, pos.x, pos.y);
    } */
}

export {createBackgroundLayer, createSpriteLayer};
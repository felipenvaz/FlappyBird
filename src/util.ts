import IRectangle from './interfaces/IRectangle';

export const hasCollided = (rect1: IRectangle, rect2: IRectangle) => {
    return rect1.x < rect2.x + rect2.width
    && rect1.x + rect1.width > rect2.x
    && rect1.y < rect2.y + rect2.height
    && rect1.y + rect1.height > rect2.y;
};
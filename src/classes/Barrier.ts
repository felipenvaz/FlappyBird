import IRectangle from 'src/interfaces/IRectangle';
import { hasCollided } from 'src/util';

export default class Barrier {
    public readonly width = 20;
    private topPart: IRectangle;
    private bottomPart: IRectangle;

    constructor(private boardWidth: number, private boardHeight: number, private passageHeight: number, public passageY: number) {
        this.topPart = {
            y: 0,
            x: this.boardWidth - this.width,
            width: this.width,
            height: this.boardHeight - passageY - (this.passageHeight / 2),
            color: 'brown'
        };

        const bottomY = this.boardHeight - passageY + (this.passageHeight / 2);
        this.bottomPart = {
            y: bottomY,
            x: this.boardWidth - this.width,
            width: this.width,
            height: this.boardHeight - bottomY,
            color: 'brown'
        };
    }

    public moveLeft(distance: number) {
        this.topPart.x -= distance;
        this.bottomPart.x -= distance;
    }

    public getRectangles() {
        return [this.topPart, this.bottomPart];
    }

    public isOutsideBoard() {
        return this.topPart.x + this.topPart.width < 0;
    }

    public getX() {
        return this.topPart.x;
    }

    public hasCollided(player: IRectangle) {
        return hasCollided(player, this.topPart) || hasCollided(player, this.bottomPart);
    }
}
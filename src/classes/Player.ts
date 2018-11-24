import IRectangle from 'src/interfaces/IRectangle';

export default class Player implements IRectangle {
    public color = 'blue';
    public height = 20;
    public width = 20;
    public acceleration = 0;

    constructor(public x: number, public y: number) {

    }

    public getBottom() {
        return this.y + this.height;
    }
}
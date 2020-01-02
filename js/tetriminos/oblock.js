import Block from './block';

export default class LBlock extends Block {
    constructor(x, y) {
        super(x, y);
        this.shape = [
            [5, 5],
            [5, 5]
        ];
    }
}
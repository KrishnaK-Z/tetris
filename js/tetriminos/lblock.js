import Block from './block';

export default class LBlock extends Block {
    constructor(x, y) {
        super(x, y);
        this.shape = [
            [4, 0, 0],
            [4, 0, 0],
            [4, 4, 0]
        ];
    }
}
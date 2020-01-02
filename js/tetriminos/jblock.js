import Block from './block';

export default class JBlock extends Block {
    constructor(x, y) {
        super(x, y);
        this.shape = [
            [0, 0, 3],
            [0, 0, 3],
            [0, 3, 3]
        ];
    }
}
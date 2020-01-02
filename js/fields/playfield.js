import IBlock from '../tetriminos/iblock';
import JBlock from '../tetriminos/jblock';
import LBlock from '../tetriminos/lblock';
import OBlock from '../tetriminos/oblock';
import SBlock from '../tetriminos/sblock';
import TBlock from '../tetriminos/tblock';
import ZBlock from '../tetriminos/zblock';
import Block from '../tetriminos/block';
import Field from './field';

export default class PlayField extends Field {

    constructor() {
        super();

        this.canvas = [
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        this.bag = [];

        this.blocks = {
            ghostBlock: null,
            currentBlock: null
        };

        this.registerListeners();
        this.generateNewBag(true);
        this.newBlockFromBag();
    }

    /**
     * Update the ghost in lower using collision
     */
    updateGhostBlock() {
        let collission = false;

        this.blocks.ghostBlock = new Block(this.blocks.currentBlock.x, this.blocks.currentBlock.y);
        //Because the shape is a multi-dimensional array we need to derefference it when copying.
        this.blocks.ghostBlock.shape = this.blocks.currentBlock.shape.map(function(row) {
            return row.slice();
        });
        this.blocks.ghostBlock.makeGhost();

        do {
            this.blocks.ghostBlock.y += 1;

            collission = this.checkCollision(this.blocks.ghostBlock);
            if (collission) {
                this.blocks.ghostBlock.y -= 1;
            }
        } while (!collission);
    }

    /**
     * Rotate the block on up arrow
     */
    rotateCurrentBlock() {
        this.blocks.currentBlock.rotateRight();

        if (this.collision(this.blocks.currentBlock)) {
            this.blocks.currentBlock.rotateLeft();
        }
        this.updateGhostBlock();
    }

    /**
     * Move current left if collision detected restore old shape
     */
    moveCurrentBlockLeft() {
        this.blocks.currentBlock.x--;

        if (this.checkCollision(this.blocks.currentBlock)) {
            this.blocks.currentBlock.x++;
        }

        this.updateGhostBlock();
    }

    /**
     * Move current right if collision detected restore old shape
     */
    moveCurrentBlockRight() {
        this.blocks.currentBlock.x++;

        if (this.checkCollision(this.blocks.currentBlock)) {
            this.blocks.currentBlock.x--;
        }

        this.updateGhostBlock();
    }

    /**
     * If collide with the wall restore old shape
     */
    checkCollision(block) {
        let collision = false;

        loop1:
            for (let y = 0; y < block.shape.length; y++) {
                for (let x = 0; x < block.shape[y].length; x++) {
                    if (block.shape[y][x] !== 0 && this.canvas[y + block.y][x + block.x + 2] !== 0) {
                        collision = true;
                        break loop1;
                    }
                }

            }
        return collision;
    }

    /**
     * START: Downward unreversable movement
     */

    /**
     * Stores the currentblock into the playfield.
     */

    /**
     * add new row at the beginning of the plyfield
     */
    addNewRow() {
        this.canvas.unshift([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
    }

    /**
     * render the new temp palyfield
     */
    saveBlock() {
        this.canvas = this.renderTempField();
    }

    /**
     * Check if there are new lines formed.
     */
    checkLines() {
        let clearedRows = 0;

        for (let y = 0; y < this.canvas.length; y++) {
            let sumRow = 0;
            for (let x = 0; x < this.canvas[y].length; x++) {
                /**
                 * If that row contains any empty spaces ignore it
                 */
                if (this.canvas[y][x] == 0) {
                    sumRow = 0;
                    break;
                }
                sumRow += this.canvas[y][x];
            }

            //If the sum of the row is higher than 14, it means a block is present since it's bigger than 1,1,1,1,1,1,1,1,1,1,1,1,1,1
            if (sumRow > 14) {
                // remove the competed row
                this.canvas.splice(y, 1);

                // Add new row at top of playfield
                this.addNewRow();

                clearedRows++;
            }
        }

        /**
         * on clearing each row dispatch a rowCleared event
         */
        if (clearedRows > 0) {
            const event = new CustomEvent('TetrisRowsCleared', { detail: { clearedRows: clearedRows } });

            document.dispatchEvent(event);
        }
    }

    moveCurrentBlockDown() {
        this.blocks.currentBlock.y++;

        if (this.checkCollision(this.blocks.currentBlock)) {
            this.blocks.currentBlock.y--;

            this.saveBlock();
            this.checkLines();
            this.newBlockFromBag();

            return false;
        }

        return true;
    }

    /**
     * END: Downward unreversable movement
     */

    /**
     * START: Genearating new block and shuffle
     */

    /**
     * Genrate blocks on random
     * @param {*} fromConstructor 
     */
    generateNewBag(fromConstructor) {
        this.bag = [IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock];
        this.shuffleBag(fromConstructor);
    }

    /**
     * shuffle the teterminos
     * @param {*} firstBag 
     */
    shuffleBag(firstBag) {
        for (let i = this.bag.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [this.bag[i - 1], this.bag[j]] = [this.bag[j], this.bag[i - 1]];
        }

        if (firstBag) {
            if (this.bag[0] == SBlock || this.bag[0] == ZBlock || this.bag[0] == OBlock) {
                this.shuffleBag(true);
            }
        }
    }

    /**
     * Takes the first block from the bag and assign it to the current block.
     * If the bag is empty, generate a new one.
     */
    newBlockFromBag() {
        const blockType = this.bag.shift();

        this.blocks.currentBlock = new blockType(3, 0);
        this.updateGhostBlock();

        if (this.bag.length === 0) {
            this.generateNewBag(false);
        }

        const event = new CustomEvent('TetrisNewNextBlock', { detail: { nextBlock: this.bag[0] } });
        document.dispatchEvent(event);

        if (this.checkCollision(this.blocks.currentBlock)) {
            const event = new Event('TetrisGameOver');
            document.dispatchEvent(event);
        }
    }

    /**
     * STOP: Genearating new block and shuffle
     */

    /**
     * Hold the current block
     */
    holdBlock(e) {
        const event = new CustomEvent('TetrisNewHoldBlock', { detail: { holdBlock: this.blocks.currentBlock } });

        document.dispatchEvent(event);

        if (!e.detail.holdBlock) {
            this.newBlockFromBag()
        } else {
            this.blocks.currentBlock = e.detail.holdBlock;
            this.blocks.currentBlock.x = 3;
            this.blocks.currentBlock.y = 0;
            this.updateGhostBlock();
        }
    }

    /**
     * Drop current block until collision detects
     */
    dropBlock() {
        let result;

        do {
            result = this.moveCurrentBlockDown()
        } while (result);
    }

    /**
     * Mapping functions to key
     */
    registerListeners() {
        const self = this;

        document.addEventListener('TetrisArrowUp', function() {
            self.rotateCurrentBlock();
        });

        document.addEventListener('TetrisArrowDown', function() {
            self.moveCurrentBlockDown();
        });

        document.addEventListener('TetrisArrowLeft', function() {
            self.moveCurrentBlockLeft();
        });

        document.addEventListener('TetrisArrowRight', function() {
            self.moveCurrentBlockRight();
        });

        document.addEventListener('TetrisSpace', function() {
            self.dropBlock();
        });

        document.addEventListener('TetrisTransferHoldBlock', function(e) {
            self.holdBlock(e);
        });
    }
}
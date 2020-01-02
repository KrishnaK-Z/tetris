import { colors } from '../constants/colors';

export default class Field {

    /**
     * Draw things in canvas
     */
    draw(ctx) {
        const tempField = this.renderTempField();

        tempField.map(function(val, y) {
            val.map(function(val, x) {
                ctx.fillStyle = colors[val];
                ctx.fillRect(x * 20, y * 20, 20, 20);
            })
        });
    }

    /**
     * Returns a new playfield with the currentblock and ghostblock merged into them.
     */
    renderTempField() {
        /**
         * create a new derefferenced playfield from current playfield
         */
        let tempField = this.canvas.map(function(arr) {
            return arr.slice();
        });

        /**
         * Merge the blocks with the playfield
         * Loop through objects
         */
        Object.keys(this.blocks).forEach(key => {
            this.renderBlock(tempField, this.blocks[key])
        });

        return tempField;
    }

    /**
     * Merges a block with a field
     * 
     */
    renderBlock(field, tetrimino) {
        if (!tetrimino) {
            return;
        }

        tetrimino.shape.map(function(arr, j) {
            arr.map(function(val, i) {
                if (val === 0) {
                    return;
                }

                field[j + tetrimino.y][i + tetrimino.x + 2] = val;
            })
        });
    }
}
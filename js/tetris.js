import { keys } from './constants/keys';

import Playfield from './fields/playfield';
import Holdfield from './fields/holdfield';
import Nextfield from './fields/nextfield';

class Tetris {
    constructor() {
        this.gameComponents = {
            hold: 'hold',
            tetris: 'tetris',
            next: 'next',
            level: 'level',
            rows: 'rows',
            score: 'score',
            time: 'time'
        };

        this.holdfield = new Holdfield();
        this.nextfield = new Nextfield();
        this.playfield = new Playfield();

        this.tetrisCanvas = document.getElementById(this.gameComponents.tetris);
        this.holdCanvas = document.getElementById(this.gameComponents.hold);
        this.nextCanvas = document.getElementById(this.gameComponents.next);

        this.fps = 50;
        this.level = 1;
        this.score = 0;
        this.rows = 0;
        this.timeout = 1000 / this.fps;
        this.pause = false;
        this.loopCount = 0;

        this.initializeListeners();
        this.startGame();
    }

    initializeListeners() {
        const self = this;

        document.addEventListener("keydown", function(e) {
            self.handleKeyEvents(e);
        });

        document.addEventListener("TetrisGameOver", function(e) {
            self.gameOver();
        });

        document.addEventListener("TetrisPause", function(e) {
            self.pauseGame();
        });

        document.addEventListener("TetrisRowsCleared", function(e) {
            self.updateScores(e);
        });
    }

    startGame() {
        const self = this;
        this.gameLoop = setInterval(function() {
            self.loop(self);
        }, this.timeout);
    }

    stopGame() {
        clearInterval(this.gameLoop);
    }

    gameOver() {
        this.stopGame();
        this.drawText("Game Over");
    }

    pauseGame() {
        if (!this.pause) {
            this.pause = true;
            this.stopGame();
            this.drawText("Pause");
        } else {
            this.pause = false;
            this.startGame();
        }
    }

    loop(self) {
        self.update();
        self.draw();
    }

    /**
     * update the score board
     */
    update() {
        this.loopCount++;

        if ((this.loopCount % ((this.fps * 2) - (this.level * 10))) === 0) {
            this.playfield.moveCurrentBlockDown();
        }
    }

    /**
     * Draw the block on playfield
     */
    draw() {
        const tetrisCtx = this.tetrisCanvas.getContext("2d");
        const holdCtx = this.holdCanvas.getContext("2d");
        const nextCtx = this.nextCanvas.getContext("2d");

        this.playfield.draw(tetrisCtx);
        this.holdfield.draw(holdCtx);
        this.nextfield.draw(nextCtx);

        document.getElementById(this.gameComponents.score).innerText = this.score;
        document.getElementById(this.gameComponents.rows).innerText = this.rows;
        document.getElementById(this.gameComponents.level).innerText = this.level;
        document.getElementById(this.gameComponents.time).innerText = this.getTime();
    }

    /**
     * Retuns time string
     */
    getTime() {
        return new Date(Math.floor(this.loopCount / this.fps) * 1000).toISOString().substr(11, 8);
    }

    drawText(text) {
        const ctx = this.tetrisCanvas.getContext("2d");
        ctx.font = "30px aerial";
        ctx.fillStyle = "#666666";
        ctx.textAlign = "center";

        ctx.fillRect(0, 0, 300, 600);
        ctx.fillText(text, 150, 250);
    }

    /**
     * Update scoreBoard
     * @param {*} e 
     */
    updateScores(e) {
        const clearedRows = e.detail.clearedRows;

        this.rows += clearedRows;
        this.score += Math.floor(50 * Math.pow(1.1, clearedRows) * clearedRows);
        this.level = Math.floor(this.rows / 20) + 1;

        if (this.level > 9) {
            this.level = 9;
        }
    }

    handleKeyEvents(e) {
        let event;

        if (this.pause && e.keyCode !== keys.PauseP) {
            return;
        }

        switch (e.keyCode) {
            case keys.ArrowUp:
                e.preventDefault();
                event = new Event('TetrisArrowUp');
                break;

            case keys.ArrowDown:
                e.preventDefault();
                event = new Event('TetrisArrowDown');
                break;

            case keys.ArrowLeft:
                e.preventDefault();
                event = new Event('TetrisArrowLeft');
                break;

            case keys.ArrowRight:
                e.preventDefault();
                event = new Event('TetrisArrowRight');
                break;

            case keys.Space:
                e.preventDefault();
                event = new Event('TetrisSpace');
                break;

            case keys.PauseP:
                e.preventDefault();
                event = new Event('TetrisPause');
                break;

            case keys.HoldH:
                e.preventDefault();
                event = new Event('TetrisHold');
                break;
        }

        if (event) {
            document.dispatchEvent(event);
        }
    }
}

new Tetris();
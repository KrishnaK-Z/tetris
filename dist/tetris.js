(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = void 0;
var colors = {
  0: '#f0f0f0',
  1: '#58595b',
  2: '#037ef3',
  3: '#b22746',
  4: '#ed1c24',
  5: '#6534ac',
  6: '#f1632a',
  7: '#05cc47',
  8: '#6633cc',
  9: '#cfcfcf'
};
exports.colors = colors;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = void 0;
var keys = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Space: 32,
  PauseP: 80,
  HoldH: 72
};
exports.keys = keys;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _colors = require("../constants/colors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Field =
/*#__PURE__*/
function () {
  function Field() {
    _classCallCheck(this, Field);
  }

  _createClass(Field, [{
    key: "draw",

    /**
     * Draw things in canvas
     */
    value: function draw(ctx) {
      var tempField = this.renderTempField();
      tempField.map(function (val, y) {
        val.map(function (val, x) {
          ctx.fillStyle = _colors.colors[val];
          ctx.fillRect(x * 20, y * 20, 20, 20);
        });
      });
    }
    /**
     * Returns a new playfield with the currentblock and ghostblock merged into them.
     */

  }, {
    key: "renderTempField",
    value: function renderTempField() {
      var _this = this;

      /**
       * create a new derefferenced playfield from current playfield
       */
      var tempField = this.canvas.map(function (arr) {
        return arr.slice();
      });
      /**
       * Merge the blocks with the playfield
       * Loop through objects
       */

      Object.keys(this.blocks).forEach(function (key) {
        _this.renderBlock(tempField, _this.blocks[key]);
      });
      return tempField;
    }
    /**
     * Merges a block with a field
     * 
     */

  }, {
    key: "renderBlock",
    value: function renderBlock(field, tetrimino) {
      if (!tetrimino) {
        return;
      }

      tetrimino.shape.map(function (arr, j) {
        arr.map(function (val, i) {
          if (val === 0) {
            return;
          }

          field[j + tetrimino.y][i + tetrimino.x + 2] = val;
        });
      });
    }
  }]);

  return Field;
}();

exports["default"] = Field;

},{"../constants/colors":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _field = _interopRequireDefault(require("./field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HoldField =
/*#__PURE__*/
function (_Field) {
  _inherits(HoldField, _Field);

  function HoldField() {
    var _this;

    _classCallCheck(this, HoldField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HoldField).call(this));
    _this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
    _this.canHold = true;
    _this.blocks = {
      currentBlock: null
    };

    _this.registerListeners();

    return _this;
  }

  _createClass(HoldField, [{
    key: "registerListeners",
    value: function registerListeners() {
      var self = this;
      document.addEventListener('TetrisNewHoldBlock', function (e) {
        self.setBlock(e);
      });
      document.addEventListener('TetrisHold', function () {
        self.sendHoldBlock();
      });
      document.addEventListener('TetrisNewNextBlock', function () {
        self.resetHold();
      });
    }
    /*
     Set the block to a local variable
     */

  }, {
    key: "setBlock",
    value: function setBlock(e) {
      this.blocks.currentBlock = e.detail.holdBlock;
      this.blocks.currentBlock.x = 0;
      this.blocks.currentBlock.y = 2;

      while (this.blocks.currentBlock.rotation !== 0) {
        this.blocks.currentBlock.rotateLeft();
      }
    }
    /*
     Resets the hold
     */

  }, {
    key: "resetHold",
    value: function resetHold() {
      this.canHold = true;
    }
    /*
     Sends the hold block back to the playfield
     */

  }, {
    key: "sendHoldBlock",
    value: function sendHoldBlock() {
      if (!this.canHold) {
        return;
      }

      var event = new CustomEvent('TetrisTransferHoldBlock', {
        detail: {
          holdBlock: this.blocks.currentBlock
        }
      });
      document.dispatchEvent(event);
      this.canHold = false;
    }
  }]);

  return HoldField;
}(_field["default"]);

exports["default"] = HoldField;

},{"./field":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _field = _interopRequireDefault(require("./field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NextField =
/*#__PURE__*/
function (_Field) {
  _inherits(NextField, _Field);

  function NextField() {
    var _this;

    _classCallCheck(this, NextField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NextField).call(this));
    _this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
    _this.blocks = {
      currentBlock: null
    };

    _this.registerListeners();

    return _this;
  }

  _createClass(NextField, [{
    key: "registerListeners",
    value: function registerListeners() {
      var self = this;
      document.addEventListener('TetrisNewNextBlock', function (e) {
        self.setBlock(e);
      });
    }
    /*
     Set the block to a local variable
     */

  }, {
    key: "setBlock",
    value: function setBlock(e) {
      var blockType = e.detail.nextBlock;
      this.blocks.currentBlock = new blockType(0, 2);
    }
  }]);

  return NextField;
}(_field["default"]);

exports["default"] = NextField;

},{"./field":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _iblock = _interopRequireDefault(require("../tetriminos/iblock"));

var _jblock = _interopRequireDefault(require("../tetriminos/jblock"));

var _lblock = _interopRequireDefault(require("../tetriminos/lblock"));

var _oblock = _interopRequireDefault(require("../tetriminos/oblock"));

var _sblock = _interopRequireDefault(require("../tetriminos/sblock"));

var _tblock = _interopRequireDefault(require("../tetriminos/tblock"));

var _zblock = _interopRequireDefault(require("../tetriminos/zblock"));

var _block = _interopRequireDefault(require("../tetriminos/block"));

var _field = _interopRequireDefault(require("./field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PlayField =
/*#__PURE__*/
function (_Field) {
  _inherits(PlayField, _Field);

  function PlayField() {
    var _this;

    _classCallCheck(this, PlayField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayField).call(this));
    _this.canvas = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    _this.bag = [];
    _this.blocks = {
      ghostBlock: null,
      currentBlock: null
    };

    _this.registerListeners();

    _this.generateNewBag(true);

    _this.newBlockFromBag();

    return _this;
  }
  /**
   * Update the ghost in lower using collision
   */


  _createClass(PlayField, [{
    key: "updateGhostBlock",
    value: function updateGhostBlock() {
      var collission = false;
      this.blocks.ghostBlock = new _block["default"](this.blocks.currentBlock.x, this.blocks.currentBlock.y); //Because the shape is a multi-dimensional array we need to derefference it when copying.

      this.blocks.ghostBlock.shape = this.blocks.currentBlock.shape.map(function (row) {
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

  }, {
    key: "rotateCurrentBlock",
    value: function rotateCurrentBlock() {
      this.blocks.currentBlock.rotateRight();

      if (this.collision(this.blocks.currentBlock)) {
        this.blocks.currentBlock.rotateLeft();
      }

      this.updateGhostBlock();
    }
    /**
     * Move current left if collision detected restore old shape
     */

  }, {
    key: "moveCurrentBlockLeft",
    value: function moveCurrentBlockLeft() {
      this.blocks.currentBlock.x--;

      if (this.checkCollision(this.blocks.currentBlock)) {
        this.blocks.currentBlock.x++;
      }

      this.updateGhostBlock();
    }
    /**
     * Move current right if collision detected restore old shape
     */

  }, {
    key: "moveCurrentBlockRight",
    value: function moveCurrentBlockRight() {
      this.blocks.currentBlock.x++;

      if (this.checkCollision(this.blocks.currentBlock)) {
        this.blocks.currentBlock.x--;
      }

      this.updateGhostBlock();
    }
    /**
     * If collide with the wall restore old shape
     */

  }, {
    key: "checkCollision",
    value: function checkCollision(block) {
      var collision = false;

      loop1: for (var y = 0; y < block.shape.length; y++) {
        for (var x = 0; x < block.shape[y].length; x++) {
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

  }, {
    key: "addNewRow",
    value: function addNewRow() {
      this.canvas.unshift([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
    }
    /**
     * render the new temp palyfield
     */

  }, {
    key: "saveBlock",
    value: function saveBlock() {
      this.canvas = this.renderTempField();
    }
    /**
     * Check if there are new lines formed.
     */

  }, {
    key: "checkLines",
    value: function checkLines() {
      var clearedRows = 0;

      for (var y = 0; y < this.canvas.length; y++) {
        var sumRow = 0;

        for (var x = 0; x < this.canvas[y].length; x++) {
          /**
           * If that row contains any empty spaces ignore it
           */
          if (this.canvas[y][x] == 0) {
            sumRow = 0;
            break;
          }

          sumRow += this.canvas[y][x];
        } //If the sum of the row is higher than 14, it means a block is present since it's bigger than 1,1,1,1,1,1,1,1,1,1,1,1,1,1


        if (sumRow > 14) {
          // remove the competed row
          this.canvas.splice(y, 1); // Add new row at top of playfield

          this.addNewRow();
          clearedRows++;
        }
      }
      /**
       * on clearing each row dispatch a rowCleared event
       */


      if (clearedRows > 0) {
        var event = new CustomEvent('TetrisRowsCleared', {
          detail: {
            clearedRows: clearedRows
          }
        });
        document.dispatchEvent(event);
      }
    }
  }, {
    key: "moveCurrentBlockDown",
    value: function moveCurrentBlockDown() {
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

  }, {
    key: "generateNewBag",
    value: function generateNewBag(fromConstructor) {
      this.bag = [_iblock["default"], _jblock["default"], _lblock["default"], _oblock["default"], _sblock["default"], _tblock["default"], _zblock["default"]];
      this.shuffleBag(fromConstructor);
    }
    /**
     * shuffle the teterminos
     * @param {*} firstBag 
     */

  }, {
    key: "shuffleBag",
    value: function shuffleBag(firstBag) {
      for (var i = this.bag.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        var _ref = [this.bag[j], this.bag[i - 1]];
        this.bag[i - 1] = _ref[0];
        this.bag[j] = _ref[1];
      }

      if (firstBag) {
        if (this.bag[0] == _sblock["default"] || this.bag[0] == _zblock["default"] || this.bag[0] == _oblock["default"]) {
          this.shuffleBag(true);
        }
      }
    }
    /**
     * Takes the first block from the bag and assign it to the current block.
     * If the bag is empty, generate a new one.
     */

  }, {
    key: "newBlockFromBag",
    value: function newBlockFromBag() {
      var blockType = this.bag.shift();
      this.blocks.currentBlock = new blockType(3, 0);
      this.updateGhostBlock();

      if (this.bag.length === 0) {
        this.generateNewBag(false);
      }

      var event = new CustomEvent('TetrisNewNextBlock', {
        detail: {
          nextBlock: this.bag[0]
        }
      });
      document.dispatchEvent(event);

      if (this.checkCollision(this.blocks.currentBlock)) {
        var _event = new Event('TetrisGameOver');

        document.dispatchEvent(_event);
      }
    }
    /**
     * STOP: Genearating new block and shuffle
     */

    /**
     * Hold the current block
     */

  }, {
    key: "holdBlock",
    value: function holdBlock(e) {
      var event = new CustomEvent('TetrisNewHoldBlock', {
        detail: {
          holdBlock: this.blocks.currentBlock
        }
      });
      document.dispatchEvent(event);

      if (!e.detail.holdBlock) {
        this.newBlockFromBag();
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

  }, {
    key: "dropBlock",
    value: function dropBlock() {
      var result;

      do {
        result = this.moveCurrentBlockDown();
      } while (result);
    }
    /**
     * Mapping functions to key
     */

  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var self = this;
      document.addEventListener('TetrisArrowUp', function () {
        self.rotateCurrentBlock();
      });
      document.addEventListener('TetrisArrowDown', function () {
        self.moveCurrentBlockDown();
      });
      document.addEventListener('TetrisArrowLeft', function () {
        self.moveCurrentBlockLeft();
      });
      document.addEventListener('TetrisArrowRight', function () {
        self.moveCurrentBlockRight();
      });
      document.addEventListener('TetrisSpace', function () {
        self.dropBlock();
      });
      document.addEventListener('TetrisTransferHoldBlock', function (e) {
        self.holdBlock(e);
      });
    }
  }]);

  return PlayField;
}(_field["default"]);

exports["default"] = PlayField;

},{"../tetriminos/block":7,"../tetriminos/iblock":8,"../tetriminos/jblock":9,"../tetriminos/lblock":10,"../tetriminos/oblock":11,"../tetriminos/sblock":12,"../tetriminos/tblock":13,"../tetriminos/zblock":14,"./field":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Block =
/*#__PURE__*/
function () {
  function Block(x, y) {
    _classCallCheck(this, Block);

    this.x = x;
    this.y = y;
    this.rotation = 0;
  }
  /**
   * Default rotation
   */


  _createClass(Block, [{
    key: "rotateRight",
    value: function rotateRight() {
      this.transpose();
      this.rowReverse();
      this.rotation++;

      if (this.rowReverse > 3) {
        this.rotation = 0;
      }
    }
    /**
     * Restore old shape
     */

  }, {
    key: "rotateLeft",
    value: function rotateLeft() {
      this.transpose();
      this.columnReverse();
      this.rotation--;

      if (this.rotation < 0) {
        this.rotation = 3;
      }
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var oldShape = this.shape;
      this.shape = oldShape[0].map(function (col, i) {
        return oldShape.map(function (row) {
          return row[i];
        });
      });
    }
  }, {
    key: "rowReverse",
    value: function rowReverse() {
      this.shape = this.shape.map(function (row) {
        return row.reverse();
      });
    }
  }, {
    key: "columnReverse",
    value: function columnReverse() {
      this.shape.reverse();
    }
  }, {
    key: "makeGhost",
    value: function makeGhost() {
      for (var y = 0; y < this.shape.length; y++) {
        for (var x = 0; x < this.shape[y].length; x++) {
          if (this.shape[y][x] == 0) {
            continue;
          }

          this.shape[y][x] = 9;
        }
      }
    }
  }]);

  return Block;
}();

exports["default"] = Block;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IBlock =
/*#__PURE__*/
function (_Block) {
  _inherits(IBlock, _Block);

  function IBlock(x, y) {
    var _this;

    _classCallCheck(this, IBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IBlock).call(this, x, y));
    _this.shape = [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]];
    return _this;
  }

  return IBlock;
}(_block["default"]);

exports["default"] = IBlock;

},{"./block":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var JBlock =
/*#__PURE__*/
function (_Block) {
  _inherits(JBlock, _Block);

  function JBlock(x, y) {
    var _this;

    _classCallCheck(this, JBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JBlock).call(this, x, y));
    _this.shape = [[0, 0, 3], [0, 0, 3], [0, 3, 3]];
    return _this;
  }

  return JBlock;
}(_block["default"]);

exports["default"] = JBlock;

},{"./block":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LBlock =
/*#__PURE__*/
function (_Block) {
  _inherits(LBlock, _Block);

  function LBlock(x, y) {
    var _this;

    _classCallCheck(this, LBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LBlock).call(this, x, y));
    _this.shape = [[4, 0, 0], [4, 0, 0], [4, 4, 0]];
    return _this;
  }

  return LBlock;
}(_block["default"]);

exports["default"] = LBlock;

},{"./block":7}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LBlock =
/*#__PURE__*/
function (_Block) {
  _inherits(LBlock, _Block);

  function LBlock(x, y) {
    var _this;

    _classCallCheck(this, LBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LBlock).call(this, x, y));
    _this.shape = [[5, 5], [5, 5]];
    return _this;
  }

  return LBlock;
}(_block["default"]);

exports["default"] = LBlock;

},{"./block":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SBlock =
/*#__PURE__*/
function (_Block) {
  _inherits(SBlock, _Block);

  function SBlock(x, y) {
    var _this;

    _classCallCheck(this, SBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SBlock).call(this, x, y));
    _this.shape = [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
    return _this;
  }

  return SBlock;
}(_block["default"]);

exports["default"] = SBlock;

},{"./block":7}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TBlock =
/*#__PURE__*/
function (_Block) {
  _inherits(TBlock, _Block);

  function TBlock(x, y) {
    var _this;

    _classCallCheck(this, TBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TBlock).call(this, x, y));
    _this.shape = [[0, 7, 0], [7, 7, 7], [0, 0, 0]];
    return _this;
  }

  return TBlock;
}(_block["default"]);

exports["default"] = TBlock;

},{"./block":7}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ZBlock =
/*#__PURE__*/
function (_Block) {
  _inherits(ZBlock, _Block);

  function ZBlock(x, y) {
    var _this;

    _classCallCheck(this, ZBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZBlock).call(this, x, y));
    _this.shape = [[8, 8, 0], [0, 8, 8], [0, 0, 0]];
    return _this;
  }

  return ZBlock;
}(_block["default"]);

exports["default"] = ZBlock;

},{"./block":7}],15:[function(require,module,exports){
"use strict";

var _keys = require("./constants/keys");

var _playfield = _interopRequireDefault(require("./fields/playfield"));

var _holdfield = _interopRequireDefault(require("./fields/holdfield"));

var _nextfield = _interopRequireDefault(require("./fields/nextfield"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tetris =
/*#__PURE__*/
function () {
  function Tetris() {
    _classCallCheck(this, Tetris);

    this.gameComponents = {
      hold: 'hold',
      tetris: 'tetris',
      next: 'next',
      level: 'level',
      rows: 'rows',
      score: 'score',
      time: 'time'
    };
    this.holdfield = new _holdfield["default"]();
    this.nextfield = new _nextfield["default"]();
    this.playfield = new _playfield["default"]();
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

  _createClass(Tetris, [{
    key: "initializeListeners",
    value: function initializeListeners() {
      var self = this;
      document.addEventListener("keydown", function (e) {
        self.handleKeyEvents(e);
      });
      document.addEventListener("TetrisGameOver", function (e) {
        self.gameOver();
      });
      document.addEventListener("TetrisPause", function (e) {
        self.pauseGame();
      });
      document.addEventListener("TetrisRowsCleared", function (e) {
        self.updateScores(e);
      });
    }
  }, {
    key: "startGame",
    value: function startGame() {
      var self = this;
      this.gameLoop = setInterval(function () {
        self.loop(self);
      }, this.timeout);
    }
  }, {
    key: "stopGame",
    value: function stopGame() {
      clearInterval(this.gameLoop);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.stopGame();
      this.drawText("Game Over");
    }
  }, {
    key: "pauseGame",
    value: function pauseGame() {
      if (!this.pause) {
        this.pause = true;
        this.stopGame();
        this.drawText("Pause");
      } else {
        this.pause = false;
        this.startGame();
      }
    }
  }, {
    key: "loop",
    value: function loop(self) {
      self.update();
      self.draw();
    }
    /**
     * update the score board
     */

  }, {
    key: "update",
    value: function update() {
      this.loopCount++;

      if (this.loopCount % (this.fps * 2 - this.level * 10) === 0) {
        this.playfield.moveCurrentBlockDown();
      }
    }
    /**
     * Draw the block on playfield
     */

  }, {
    key: "draw",
    value: function draw() {
      var tetrisCtx = this.tetrisCanvas.getContext("2d");
      var holdCtx = this.holdCanvas.getContext("2d");
      var nextCtx = this.nextCanvas.getContext("2d");
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

  }, {
    key: "getTime",
    value: function getTime() {
      return new Date(Math.floor(this.loopCount / this.fps) * 1000).toISOString().substr(11, 8);
    }
  }, {
    key: "drawText",
    value: function drawText(text) {
      var ctx = this.tetrisCanvas.getContext("2d");
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

  }, {
    key: "updateScores",
    value: function updateScores(e) {
      var clearedRows = e.detail.clearedRows;
      this.rows += clearedRows;
      this.score += Math.floor(50 * Math.pow(1.1, clearedRows) * clearedRows);
      this.level = Math.floor(this.rows / 20) + 1;

      if (this.level > 9) {
        this.level = 9;
      }
    }
  }, {
    key: "handleKeyEvents",
    value: function handleKeyEvents(e) {
      var event;

      if (this.pause && e.keyCode !== _keys.keys.PauseP) {
        return;
      }

      switch (e.keyCode) {
        case _keys.keys.ArrowUp:
          e.preventDefault();
          event = new Event('TetrisArrowUp');
          break;

        case _keys.keys.ArrowDown:
          e.preventDefault();
          event = new Event('TetrisArrowDown');
          break;

        case _keys.keys.ArrowLeft:
          e.preventDefault();
          event = new Event('TetrisArrowLeft');
          break;

        case _keys.keys.ArrowRight:
          e.preventDefault();
          event = new Event('TetrisArrowRight');
          break;

        case _keys.keys.Space:
          e.preventDefault();
          event = new Event('TetrisSpace');
          break;

        case _keys.keys.PauseP:
          e.preventDefault();
          event = new Event('TetrisPause');
          break;

        case _keys.keys.HoldH:
          e.preventDefault();
          event = new Event('TetrisHold');
          break;
      }

      if (event) {
        document.dispatchEvent(event);
      }
    }
  }]);

  return Tetris;
}();

new Tetris();

},{"./constants/keys":2,"./fields/holdfield":4,"./fields/nextfield":5,"./fields/playfield":6}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jb25zdGFudHMvY29sb3JzLmpzIiwianMvY29uc3RhbnRzL2tleXMuanMiLCJqcy9maWVsZHMvZmllbGQuanMiLCJqcy9maWVsZHMvaG9sZGZpZWxkLmpzIiwianMvZmllbGRzL25leHRmaWVsZC5qcyIsImpzL2ZpZWxkcy9wbGF5ZmllbGQuanMiLCJqcy90ZXRyaW1pbm9zL2Jsb2NrLmpzIiwianMvdGV0cmltaW5vcy9pYmxvY2suanMiLCJqcy90ZXRyaW1pbm9zL2pibG9jay5qcyIsImpzL3RldHJpbWlub3MvbGJsb2NrLmpzIiwianMvdGV0cmltaW5vcy9vYmxvY2suanMiLCJqcy90ZXRyaW1pbm9zL3NibG9jay5qcyIsImpzL3RldHJpbWlub3MvdGJsb2NrLmpzIiwianMvdGV0cmltaW5vcy96YmxvY2suanMiLCJqcy90ZXRyaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBTyxJQUFNLE1BQU0sR0FBRztBQUNsQixLQUFHLFNBRGU7QUFFbEIsS0FBRyxTQUZlO0FBR2xCLEtBQUcsU0FIZTtBQUlsQixLQUFHLFNBSmU7QUFLbEIsS0FBRyxTQUxlO0FBTWxCLEtBQUcsU0FOZTtBQU9sQixLQUFHLFNBUGU7QUFRbEIsS0FBRyxTQVJlO0FBU2xCLEtBQUcsU0FUZTtBQVVsQixLQUFHO0FBVmUsQ0FBZjs7Ozs7Ozs7OztBQ0FBLElBQU0sSUFBSSxHQUFHO0FBQ2hCLEVBQUEsT0FBTyxFQUFFLEVBRE87QUFFaEIsRUFBQSxTQUFTLEVBQUUsRUFGSztBQUdoQixFQUFBLFNBQVMsRUFBRSxFQUhLO0FBSWhCLEVBQUEsVUFBVSxFQUFFLEVBSkk7QUFLaEIsRUFBQSxLQUFLLEVBQUUsRUFMUztBQU1oQixFQUFBLE1BQU0sRUFBRSxFQU5RO0FBT2hCLEVBQUEsS0FBSyxFQUFFO0FBUFMsQ0FBYjs7Ozs7Ozs7Ozs7QUNBUDs7Ozs7Ozs7SUFFcUIsSzs7Ozs7Ozs7OztBQUVqQjs7O3lCQUdLLEcsRUFBSztBQUNOLFVBQU0sU0FBUyxHQUFHLEtBQUssZUFBTCxFQUFsQjtBQUVBLE1BQUEsU0FBUyxDQUFDLEdBQVYsQ0FBYyxVQUFTLEdBQVQsRUFBYyxDQUFkLEVBQWlCO0FBQzNCLFFBQUEsR0FBRyxDQUFDLEdBQUosQ0FBUSxVQUFTLEdBQVQsRUFBYyxDQUFkLEVBQWlCO0FBQ3JCLFVBQUEsR0FBRyxDQUFDLFNBQUosR0FBZ0IsZUFBTyxHQUFQLENBQWhCO0FBQ0EsVUFBQSxHQUFHLENBQUMsUUFBSixDQUFhLENBQUMsR0FBRyxFQUFqQixFQUFxQixDQUFDLEdBQUcsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakM7QUFDSCxTQUhEO0FBSUgsT0FMRDtBQU1IO0FBRUQ7Ozs7OztzQ0FHa0I7QUFBQTs7QUFDZDs7O0FBR0EsVUFBSSxTQUFTLEdBQUcsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFTLEdBQVQsRUFBYztBQUMxQyxlQUFPLEdBQUcsQ0FBQyxLQUFKLEVBQVA7QUFDSCxPQUZlLENBQWhCO0FBSUE7Ozs7O0FBSUEsTUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssTUFBakIsRUFBeUIsT0FBekIsQ0FBaUMsVUFBQSxHQUFHLEVBQUk7QUFDcEMsUUFBQSxLQUFJLENBQUMsV0FBTCxDQUFpQixTQUFqQixFQUE0QixLQUFJLENBQUMsTUFBTCxDQUFZLEdBQVosQ0FBNUI7QUFDSCxPQUZEO0FBSUEsYUFBTyxTQUFQO0FBQ0g7QUFFRDs7Ozs7OztnQ0FJWSxLLEVBQU8sUyxFQUFXO0FBQzFCLFVBQUksQ0FBQyxTQUFMLEVBQWdCO0FBQ1o7QUFDSDs7QUFFRCxNQUFBLFNBQVMsQ0FBQyxLQUFWLENBQWdCLEdBQWhCLENBQW9CLFVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUI7QUFDakMsUUFBQSxHQUFHLENBQUMsR0FBSixDQUFRLFVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUI7QUFDckIsY0FBSSxHQUFHLEtBQUssQ0FBWixFQUFlO0FBQ1g7QUFDSDs7QUFFRCxVQUFBLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQWYsQ0FBTCxDQUF1QixDQUFDLEdBQUcsU0FBUyxDQUFDLENBQWQsR0FBa0IsQ0FBekMsSUFBOEMsR0FBOUM7QUFDSCxTQU5EO0FBT0gsT0FSRDtBQVNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDMURMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCLFM7Ozs7O0FBQ2pCLHVCQUFjO0FBQUE7O0FBQUE7O0FBQ1Y7QUFDQSxVQUFLLE1BQUwsR0FBYyxDQUNWLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FEVSxFQUVWLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FGVSxFQUdWLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FIVSxFQUlWLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FKVSxFQUtWLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FMVSxFQU1WLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FOVSxDQUFkO0FBUUEsVUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQUssTUFBTCxHQUFjO0FBQ1YsTUFBQSxZQUFZLEVBQUU7QUFESixLQUFkOztBQUlBLFVBQUssaUJBQUw7O0FBZlU7QUFnQmI7Ozs7d0NBRW1CO0FBQ2hCLFVBQU0sSUFBSSxHQUFHLElBQWI7QUFFQSxNQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixvQkFBMUIsRUFBZ0QsVUFBUyxDQUFULEVBQVk7QUFDeEQsUUFBQSxJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQ7QUFDSCxPQUZEO0FBSUEsTUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsWUFBMUIsRUFBd0MsWUFBVztBQUMvQyxRQUFBLElBQUksQ0FBQyxhQUFMO0FBQ0gsT0FGRDtBQUlBLE1BQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxZQUFXO0FBQ3ZELFFBQUEsSUFBSSxDQUFDLFNBQUw7QUFDSCxPQUZEO0FBR0g7QUFJRDs7Ozs7OzZCQUdTLEMsRUFBRztBQUNSLFdBQUssTUFBTCxDQUFZLFlBQVosR0FBMkIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFwQztBQUNBLFdBQUssTUFBTCxDQUFZLFlBQVosQ0FBeUIsQ0FBekIsR0FBNkIsQ0FBN0I7QUFDQSxXQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLENBQXpCLEdBQTZCLENBQTdCOztBQUVBLGFBQU8sS0FBSyxNQUFMLENBQVksWUFBWixDQUF5QixRQUF6QixLQUFzQyxDQUE3QyxFQUFnRDtBQUM1QyxhQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLFVBQXpCO0FBQ0g7QUFDSjtBQUVEOzs7Ozs7Z0NBR1k7QUFDUixXQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0g7QUFFRDs7Ozs7O29DQUdnQjtBQUNaLFVBQUksQ0FBQyxLQUFLLE9BQVYsRUFBbUI7QUFDZjtBQUNIOztBQUVELFVBQU0sS0FBSyxHQUFHLElBQUksV0FBSixDQUFnQix5QkFBaEIsRUFBMkM7QUFBRSxRQUFBLE1BQU0sRUFBRTtBQUFFLFVBQUEsU0FBUyxFQUFFLEtBQUssTUFBTCxDQUFZO0FBQXpCO0FBQVYsT0FBM0MsQ0FBZDtBQUVBLE1BQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkI7QUFFQSxXQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0g7Ozs7RUF0RWtDLGlCOzs7Ozs7Ozs7Ozs7QUNGdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUIsUzs7Ozs7QUFDakIsdUJBQWM7QUFBQTs7QUFBQTs7QUFDVjtBQUNBLFVBQUssTUFBTCxHQUFjLENBQ1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixDQURVLEVBRVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixDQU5VLENBQWQ7QUFTQSxVQUFLLE1BQUwsR0FBYztBQUNWLE1BQUEsWUFBWSxFQUFFO0FBREosS0FBZDs7QUFJQSxVQUFLLGlCQUFMOztBQWZVO0FBZ0JiOzs7O3dDQUVtQjtBQUNoQixVQUFNLElBQUksR0FBRyxJQUFiO0FBRUEsTUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELFVBQVMsQ0FBVCxFQUFZO0FBQ3hELFFBQUEsSUFBSSxDQUFDLFFBQUwsQ0FBYyxDQUFkO0FBQ0gsT0FGRDtBQUdIO0FBSUQ7Ozs7Ozs2QkFHUyxDLEVBQUc7QUFDUixVQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBRixDQUFTLFNBQTNCO0FBRUEsV0FBSyxNQUFMLENBQVksWUFBWixHQUEyQixJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLENBQTNCO0FBQ0g7Ozs7RUFwQ2tDLGlCOzs7Ozs7Ozs7Ozs7QUNGdkM7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUIsUzs7Ozs7QUFFakIsdUJBQWM7QUFBQTs7QUFBQTs7QUFDVjtBQUVBLFVBQUssTUFBTCxHQUFjLENBQ1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQURVLEVBRVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQU5VLEVBT1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQVBVLEVBUVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQVJVLEVBU1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQVRVLEVBVVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQVZVLEVBV1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQVhVLEVBWVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQVpVLEVBYVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQWJVLEVBY1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQWRVLEVB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QUFLLFdBQUssTUFBVjtBQUNJLFVBQUEsQ0FBQyxDQUFDLGNBQUY7QUFDQSxVQUFBLEtBQUssR0FBRyxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTs7QUFFSixhQUFLLFdBQUssS0FBVjtBQUNJLFVBQUEsQ0FBQyxDQUFDLGNBQUY7QUFDQSxVQUFBLEtBQUssR0FBRyxJQUFJLEtBQUosQ0FBVSxZQUFWLENBQVI7QUFDQTtBQWxDUjs7QUFxQ0EsVUFBSSxLQUFKLEVBQVc7QUFDUCxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCO0FBQ0g7QUFDSjs7Ozs7O0FBR0wsSUFBSSxNQUFKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGNvbnN0IGNvbG9ycyA9IHtcbiAgICAwOiAnI2YwZjBmMCcsXG4gICAgMTogJyM1ODU5NWInLFxuICAgIDI6ICcjMDM3ZWYzJyxcbiAgICAzOiAnI2IyMjc0NicsXG4gICAgNDogJyNlZDFjMjQnLFxuICAgIDU6ICcjNjUzNGFjJyxcbiAgICA2OiAnI2YxNjMyYScsXG4gICAgNzogJyMwNWNjNDcnLFxuICAgIDg6ICcjNjYzM2NjJyxcbiAgICA5OiAnI2NmY2ZjZidcbn07IiwiZXhwb3J0IGNvbnN0IGtleXMgPSB7XG4gICAgQXJyb3dVcDogMzgsXG4gICAgQXJyb3dEb3duOiA0MCxcbiAgICBBcnJvd0xlZnQ6IDM3LFxuICAgIEFycm93UmlnaHQ6IDM5LFxuICAgIFNwYWNlOiAzMixcbiAgICBQYXVzZVA6IDgwLFxuICAgIEhvbGRIOiA3MlxufTsiLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdGFudHMvY29sb3JzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmllbGQge1xuXG4gICAgLyoqXG4gICAgICogRHJhdyB0aGluZ3MgaW4gY2FudmFzXG4gICAgICovXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY29uc3QgdGVtcEZpZWxkID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcblxuICAgICAgICB0ZW1wRmllbGQubWFwKGZ1bmN0aW9uKHZhbCwgeSkge1xuICAgICAgICAgICAgdmFsLm1hcChmdW5jdGlvbih2YWwsIHgpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JzW3ZhbF07XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHggKiAyMCwgeSAqIDIwLCAyMCwgMjApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXG4gICAgICovXG4gICAgcmVuZGVyVGVtcEZpZWxkKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogY3JlYXRlIGEgbmV3IGRlcmVmZmVyZW5jZWQgcGxheWZpZWxkIGZyb20gY3VycmVudCBwbGF5ZmllbGRcbiAgICAgICAgICovXG4gICAgICAgIGxldCB0ZW1wRmllbGQgPSB0aGlzLmNhbnZhcy5tYXAoZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNZXJnZSB0aGUgYmxvY2tzIHdpdGggdGhlIHBsYXlmaWVsZFxuICAgICAgICAgKiBMb29wIHRocm91Z2ggb2JqZWN0c1xuICAgICAgICAgKi9cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5ibG9ja3MpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmJsb2Nrc1trZXldKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlcyBhIGJsb2NrIHdpdGggYSBmaWVsZFxuICAgICAqIFxuICAgICAqL1xuICAgIHJlbmRlckJsb2NrKGZpZWxkLCB0ZXRyaW1pbm8pIHtcbiAgICAgICAgaWYgKCF0ZXRyaW1pbm8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRldHJpbWluby5zaGFwZS5tYXAoZnVuY3Rpb24oYXJyLCBqKSB7XG4gICAgICAgICAgICBhcnIubWFwKGZ1bmN0aW9uKHZhbCwgaSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZpZWxkW2ogKyB0ZXRyaW1pbm8ueV1baSArIHRldHJpbWluby54ICsgMl0gPSB2YWw7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0IEZpZWxkIGZyb20gJy4vZmllbGQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb2xkRmllbGQgZXh0ZW5kcyBGaWVsZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY2FudmFzID0gW1xuICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY2FuSG9sZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYmxvY2tzID0ge1xuICAgICAgICAgICAgY3VycmVudEJsb2NrOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdIb2xkQmxvY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNIb2xkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnNlbmRIb2xkQmxvY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzTmV3TmV4dEJsb2NrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnJlc2V0SG9sZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLypcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXG4gICAgICovXG4gICAgc2V0QmxvY2soZSkge1xuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sgPSBlLmRldGFpbC5ob2xkQmxvY2s7XG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54ID0gMDtcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnkgPSAyO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sucm90YXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay5yb3RhdGVMZWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICBSZXNldHMgdGhlIGhvbGRcbiAgICAgKi9cbiAgICByZXNldEhvbGQoKSB7XG4gICAgICAgIHRoaXMuY2FuSG9sZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgU2VuZHMgdGhlIGhvbGQgYmxvY2sgYmFjayB0byB0aGUgcGxheWZpZWxkXG4gICAgICovXG4gICAgc2VuZEhvbGRCbG9jaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbkhvbGQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNUcmFuc2ZlckhvbGRCbG9jaycsIHsgZGV0YWlsOiB7IGhvbGRCbG9jazogdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrIH0gfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gZmFsc2U7XG4gICAgfVxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV4dEZpZWxkIGV4dGVuZHMgRmllbGQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcbiAgICAgICAgICAgIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbiAgICAgICAgICAgIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgICAgICAgICAgIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgICAgICAgICAgIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgICAgICAgICAgIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgICAgICAgICAgIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuYmxvY2tzID0ge1xuICAgICAgICAgICAgY3VycmVudEJsb2NrOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdOZXh0QmxvY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLypcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXG4gICAgICovXG4gICAgc2V0QmxvY2soZSkge1xuICAgICAgICBjb25zdCBibG9ja1R5cGUgPSBlLmRldGFpbC5uZXh0QmxvY2s7XG5cbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrID0gbmV3IGJsb2NrVHlwZSgwLCAyKTtcbiAgICB9XG59IiwiaW1wb3J0IElCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL2libG9jayc7XG5pbXBvcnQgSkJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvamJsb2NrJztcbmltcG9ydCBMQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9sYmxvY2snO1xuaW1wb3J0IE9CbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL29ibG9jayc7XG5pbXBvcnQgU0Jsb2NrIGZyb20gJy4uL3RldHJpbWlub3Mvc2Jsb2NrJztcbmltcG9ydCBUQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy90YmxvY2snO1xuaW1wb3J0IFpCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL3pibG9jayc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9ibG9jayc7XG5pbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlGaWVsZCBleHRlbmRzIEZpZWxkIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuY2FudmFzID0gW1xuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuYmFnID0gW107XG5cbiAgICAgICAgdGhpcy5ibG9ja3MgPSB7XG4gICAgICAgICAgICBnaG9zdEJsb2NrOiBudWxsLFxuICAgICAgICAgICAgY3VycmVudEJsb2NrOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlTmV3QmFnKHRydWUpO1xuICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZ2hvc3QgaW4gbG93ZXIgdXNpbmcgY29sbGlzaW9uXG4gICAgICovXG4gICAgdXBkYXRlR2hvc3RCbG9jaygpIHtcbiAgICAgICAgbGV0IGNvbGxpc3Npb24gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmJsb2Nrcy5naG9zdEJsb2NrID0gbmV3IEJsb2NrKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54LCB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSk7XG4gICAgICAgIC8vQmVjYXVzZSB0aGUgc2hhcGUgaXMgYSBtdWx0aS1kaW1lbnNpb25hbCBhcnJheSB3ZSBuZWVkIHRvIGRlcmVmZmVyZW5jZSBpdCB3aGVuIGNvcHlpbmcuXG4gICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2suc2hhcGUgPSB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2suc2hhcGUubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgICAgICAgICAgcmV0dXJuIHJvdy5zbGljZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ibG9ja3MuZ2hvc3RCbG9jay5tYWtlR2hvc3QoKTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5naG9zdEJsb2NrLnkgKz0gMTtcblxuICAgICAgICAgICAgY29sbGlzc2lvbiA9IHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuZ2hvc3RCbG9jayk7XG4gICAgICAgICAgICBpZiAoY29sbGlzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2sueSAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICghY29sbGlzc2lvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoZSBibG9jayBvbiB1cCBhcnJvd1xuICAgICAqL1xuICAgIHJvdGF0ZUN1cnJlbnRCbG9jaygpIHtcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnJvdGF0ZVJpZ2h0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jaykpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay5yb3RhdGVMZWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZSBjdXJyZW50IGxlZnQgaWYgY29sbGlzaW9uIGRldGVjdGVkIHJlc3RvcmUgb2xkIHNoYXBlXG4gICAgICovXG4gICAgbW92ZUN1cnJlbnRCbG9ja0xlZnQoKSB7XG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54LS07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmUgY3VycmVudCByaWdodCBpZiBjb2xsaXNpb24gZGV0ZWN0ZWQgcmVzdG9yZSBvbGQgc2hhcGVcbiAgICAgKi9cbiAgICBtb3ZlQ3VycmVudEJsb2NrUmlnaHQoKSB7XG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54Kys7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGNvbGxpZGUgd2l0aCB0aGUgd2FsbCByZXN0b3JlIG9sZCBzaGFwZVxuICAgICAqL1xuICAgIGNoZWNrQ29sbGlzaW9uKGJsb2NrKSB7XG4gICAgICAgIGxldCBjb2xsaXNpb24gPSBmYWxzZTtcblxuICAgICAgICBsb29wMTpcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgYmxvY2suc2hhcGUubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJsb2NrLnNoYXBlW3ldLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChibG9jay5zaGFwZVt5XVt4XSAhPT0gMCAmJiB0aGlzLmNhbnZhc1t5ICsgYmxvY2sueV1beCArIGJsb2NrLnggKyAyXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU1RBUlQ6IERvd253YXJkIHVucmV2ZXJzYWJsZSBtb3ZlbWVudFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU3RvcmVzIHRoZSBjdXJyZW50YmxvY2sgaW50byB0aGUgcGxheWZpZWxkLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogYWRkIG5ldyByb3cgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGx5ZmllbGRcbiAgICAgKi9cbiAgICBhZGROZXdSb3coKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLnVuc2hpZnQoWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDFdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgdGhlIG5ldyB0ZW1wIHBhbHlmaWVsZFxuICAgICAqL1xuICAgIHNhdmVCbG9jaygpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZXJlIGFyZSBuZXcgbGluZXMgZm9ybWVkLlxuICAgICAqL1xuICAgIGNoZWNrTGluZXMoKSB7XG4gICAgICAgIGxldCBjbGVhcmVkUm93cyA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmNhbnZhcy5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgbGV0IHN1bVJvdyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY2FudmFzW3ldLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCByb3cgY29udGFpbnMgYW55IGVtcHR5IHNwYWNlcyBpZ25vcmUgaXRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW52YXNbeV1beF0gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdW1Sb3cgPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3VtUm93ICs9IHRoaXMuY2FudmFzW3ldW3hdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0lmIHRoZSBzdW0gb2YgdGhlIHJvdyBpcyBoaWdoZXIgdGhhbiAxNCwgaXQgbWVhbnMgYSBibG9jayBpcyBwcmVzZW50IHNpbmNlIGl0J3MgYmlnZ2VyIHRoYW4gMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXG4gICAgICAgICAgICBpZiAoc3VtUm93ID4gMTQpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGNvbXBldGVkIHJvd1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnNwbGljZSh5LCAxKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBuZXcgcm93IGF0IHRvcCBvZiBwbGF5ZmllbGRcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5ld1JvdygpO1xuXG4gICAgICAgICAgICAgICAgY2xlYXJlZFJvd3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbiBjbGVhcmluZyBlYWNoIHJvdyBkaXNwYXRjaCBhIHJvd0NsZWFyZWQgZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIGlmIChjbGVhcmVkUm93cyA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNSb3dzQ2xlYXJlZCcsIHsgZGV0YWlsOiB7IGNsZWFyZWRSb3dzOiBjbGVhcmVkUm93cyB9IH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVDdXJyZW50QmxvY2tEb3duKCkge1xuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSsrO1xuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jaykpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay55LS07XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZUJsb2NrKCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTGluZXMoKTtcbiAgICAgICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVORDogRG93bndhcmQgdW5yZXZlcnNhYmxlIG1vdmVtZW50XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBTVEFSVDogR2VuZWFyYXRpbmcgbmV3IGJsb2NrIGFuZCBzaHVmZmxlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZW5yYXRlIGJsb2NrcyBvbiByYW5kb21cbiAgICAgKiBAcGFyYW0geyp9IGZyb21Db25zdHJ1Y3RvciBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZU5ld0JhZyhmcm9tQ29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5iYWcgPSBbSUJsb2NrLCBKQmxvY2ssIExCbG9jaywgT0Jsb2NrLCBTQmxvY2ssIFRCbG9jaywgWkJsb2NrXTtcbiAgICAgICAgdGhpcy5zaHVmZmxlQmFnKGZyb21Db25zdHJ1Y3Rvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2h1ZmZsZSB0aGUgdGV0ZXJtaW5vc1xuICAgICAqIEBwYXJhbSB7Kn0gZmlyc3RCYWcgXG4gICAgICovXG4gICAgc2h1ZmZsZUJhZyhmaXJzdEJhZykge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5iYWcubGVuZ3RoOyBpOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XG4gICAgICAgICAgICBbdGhpcy5iYWdbaSAtIDFdLCB0aGlzLmJhZ1tqXV0gPSBbdGhpcy5iYWdbal0sIHRoaXMuYmFnW2kgLSAxXV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlyc3RCYWcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhZ1swXSA9PSBTQmxvY2sgfHwgdGhpcy5iYWdbMF0gPT0gWkJsb2NrIHx8IHRoaXMuYmFnWzBdID09IE9CbG9jaykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2h1ZmZsZUJhZyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VzIHRoZSBmaXJzdCBibG9jayBmcm9tIHRoZSBiYWcgYW5kIGFzc2lnbiBpdCB0byB0aGUgY3VycmVudCBibG9jay5cbiAgICAgKiBJZiB0aGUgYmFnIGlzIGVtcHR5LCBnZW5lcmF0ZSBhIG5ldyBvbmUuXG4gICAgICovXG4gICAgbmV3QmxvY2tGcm9tQmFnKCkge1xuICAgICAgICBjb25zdCBibG9ja1R5cGUgPSB0aGlzLmJhZy5zaGlmdCgpO1xuXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMywgMCk7XG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xuXG4gICAgICAgIGlmICh0aGlzLmJhZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVOZXdCYWcoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc05ld05leHRCbG9jaycsIHsgZGV0YWlsOiB7IG5leHRCbG9jazogdGhpcy5iYWdbMF0gfSB9KTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0dhbWVPdmVyJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNUT1A6IEdlbmVhcmF0aW5nIG5ldyBibG9jayBhbmQgc2h1ZmZsZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogSG9sZCB0aGUgY3VycmVudCBibG9ja1xuICAgICAqL1xuICAgIGhvbGRCbG9jayhlKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNOZXdIb2xkQmxvY2snLCB7IGRldGFpbDogeyBob2xkQmxvY2s6IHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jayB9IH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gICAgICAgIGlmICghZS5kZXRhaWwuaG9sZEJsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sgPSBlLmRldGFpbC5ob2xkQmxvY2s7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueCA9IDM7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSA9IDA7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyb3AgY3VycmVudCBibG9jayB1bnRpbCBjb2xsaXNpb24gZGV0ZWN0c1xuICAgICAqL1xuICAgIGRyb3BCbG9jaygpIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1vdmVDdXJyZW50QmxvY2tEb3duKClcbiAgICAgICAgfSB3aGlsZSAocmVzdWx0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBwaW5nIGZ1bmN0aW9ucyB0byBrZXlcbiAgICAgKi9cbiAgICByZWdpc3Rlckxpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dVcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5yb3RhdGVDdXJyZW50QmxvY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dEb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tEb3duKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93TGVmdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrTGVmdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1JpZ2h0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tSaWdodCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNTcGFjZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5kcm9wQmxvY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzVHJhbnNmZXJIb2xkQmxvY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLmhvbGRCbG9jayhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2NrIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcm90YXRpb25cbiAgICAgKi9cbiAgICByb3RhdGVSaWdodCgpIHtcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5yb3dSZXZlcnNlKCk7XG5cbiAgICAgICAgdGhpcy5yb3RhdGlvbisrO1xuICAgICAgICBpZiAodGhpcy5yb3dSZXZlcnNlID4gMykge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlIG9sZCBzaGFwZVxuICAgICAqL1xuICAgIHJvdGF0ZUxlZnQoKSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XG4gICAgICAgIHRoaXMuY29sdW1uUmV2ZXJzZSgpO1xuXG4gICAgICAgIHRoaXMucm90YXRpb24tLTtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb24gPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zcG9zZSgpIHtcbiAgICAgICAgbGV0IG9sZFNoYXBlID0gdGhpcy5zaGFwZTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9sZFNoYXBlWzBdLm1hcChmdW5jdGlvbihjb2wsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBvbGRTaGFwZS5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvd1tpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByb3dSZXZlcnNlKCkge1xuICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5zaGFwZS5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICAgICAgICByZXR1cm4gcm93LnJldmVyc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29sdW1uUmV2ZXJzZSgpIHtcbiAgICAgICAgdGhpcy5zaGFwZS5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgbWFrZUdob3N0KCkge1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuc2hhcGUubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5zaGFwZVt5XS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlW3ldW3hdID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZVt5XVt4XSA9IDk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElCbG9jayBleHRlbmRzIEJsb2NrIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuICAgICAgICB0aGlzLnNoYXBlID0gW1xuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzIsIDIsIDIsIDJdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgICAgIF07XG4gICAgfVxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkJsb2NrIGV4dGVuZHMgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXG4gICAgICAgICAgICBbMCwgMCwgM10sXG4gICAgICAgICAgICBbMCwgMCwgM10sXG4gICAgICAgICAgICBbMCwgMywgM11cbiAgICAgICAgXTtcbiAgICB9XG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMQmxvY2sgZXh0ZW5kcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5KTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcbiAgICAgICAgICAgIFs0LCAwLCAwXSxcbiAgICAgICAgICAgIFs0LCAwLCAwXSxcbiAgICAgICAgICAgIFs0LCA0LCAwXVxuICAgICAgICBdO1xuICAgIH1cbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExCbG9jayBleHRlbmRzIEJsb2NrIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuICAgICAgICB0aGlzLnNoYXBlID0gW1xuICAgICAgICAgICAgWzUsIDVdLFxuICAgICAgICAgICAgWzUsIDVdXG4gICAgICAgIF07XG4gICAgfVxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0Jsb2NrIGV4dGVuZHMgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcbiAgICAgICAgICAgIFswLCA2LCA2XSxcbiAgICAgICAgICAgIFs2LCA2LCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdXG4gICAgfVxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEJsb2NrIGV4dGVuZHMgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcbiAgICAgICAgICAgIFswLCA3LCAwXSxcbiAgICAgICAgICAgIFs3LCA3LCA3XSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdXG4gICAgfVxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWkJsb2NrIGV4dGVuZHMgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcbiAgICAgICAgICAgIFs4LCA4LCAwXSxcbiAgICAgICAgICAgIFswLCA4LCA4XSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdXG4gICAgfVxufSIsImltcG9ydCB7IGtleXMgfSBmcm9tICcuL2NvbnN0YW50cy9rZXlzJztcblxuaW1wb3J0IFBsYXlmaWVsZCBmcm9tICcuL2ZpZWxkcy9wbGF5ZmllbGQnO1xuaW1wb3J0IEhvbGRmaWVsZCBmcm9tICcuL2ZpZWxkcy9ob2xkZmllbGQnO1xuaW1wb3J0IE5leHRmaWVsZCBmcm9tICcuL2ZpZWxkcy9uZXh0ZmllbGQnO1xuXG5jbGFzcyBUZXRyaXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWVDb21wb25lbnRzID0ge1xuICAgICAgICAgICAgaG9sZDogJ2hvbGQnLFxuICAgICAgICAgICAgdGV0cmlzOiAndGV0cmlzJyxcbiAgICAgICAgICAgIG5leHQ6ICduZXh0JyxcbiAgICAgICAgICAgIGxldmVsOiAnbGV2ZWwnLFxuICAgICAgICAgICAgcm93czogJ3Jvd3MnLFxuICAgICAgICAgICAgc2NvcmU6ICdzY29yZScsXG4gICAgICAgICAgICB0aW1lOiAndGltZSdcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmhvbGRmaWVsZCA9IG5ldyBIb2xkZmllbGQoKTtcbiAgICAgICAgdGhpcy5uZXh0ZmllbGQgPSBuZXcgTmV4dGZpZWxkKCk7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gbmV3IFBsYXlmaWVsZCgpO1xuXG4gICAgICAgIHRoaXMudGV0cmlzQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nYW1lQ29tcG9uZW50cy50ZXRyaXMpO1xuICAgICAgICB0aGlzLmhvbGRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdhbWVDb21wb25lbnRzLmhvbGQpO1xuICAgICAgICB0aGlzLm5leHRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdhbWVDb21wb25lbnRzLm5leHQpO1xuXG4gICAgICAgIHRoaXMuZnBzID0gNTA7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5yb3dzID0gMDtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gMTAwMCAvIHRoaXMuZnBzO1xuICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9vcENvdW50ID0gMDtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplTGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleUV2ZW50cyhlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc0dhbWVPdmVyXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlbGYuZ2FtZU92ZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc1BhdXNlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlbGYucGF1c2VHYW1lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNSb3dzQ2xlYXJlZFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVNjb3JlcyhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5nYW1lTG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5sb29wKHNlbGYpO1xuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xuICAgIH1cblxuICAgIHN0b3BHYW1lKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZ2FtZUxvb3ApO1xuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICB0aGlzLnN0b3BHYW1lKCk7XG4gICAgICAgIHRoaXMuZHJhd1RleHQoXCJHYW1lIE92ZXJcIik7XG4gICAgfVxuXG4gICAgcGF1c2VHYW1lKCkge1xuICAgICAgICBpZiAoIXRoaXMucGF1c2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3VGV4dChcIlBhdXNlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvb3Aoc2VsZikge1xuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgICAgICBzZWxmLmRyYXcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIHNjb3JlIGJvYXJkXG4gICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xuXG4gICAgICAgIGlmICgodGhpcy5sb29wQ291bnQgJSAoKHRoaXMuZnBzICogMikgLSAodGhpcy5sZXZlbCAqIDEwKSkpID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5tb3ZlQ3VycmVudEJsb2NrRG93bigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhdyB0aGUgYmxvY2sgb24gcGxheWZpZWxkXG4gICAgICovXG4gICAgZHJhdygpIHtcbiAgICAgICAgY29uc3QgdGV0cmlzQ3R4ID0gdGhpcy50ZXRyaXNDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjb25zdCBob2xkQ3R4ID0gdGhpcy5ob2xkQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgY29uc3QgbmV4dEN0eCA9IHRoaXMubmV4dENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgdGhpcy5wbGF5ZmllbGQuZHJhdyh0ZXRyaXNDdHgpO1xuICAgICAgICB0aGlzLmhvbGRmaWVsZC5kcmF3KGhvbGRDdHgpO1xuICAgICAgICB0aGlzLm5leHRmaWVsZC5kcmF3KG5leHRDdHgpO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2FtZUNvbXBvbmVudHMuc2NvcmUpLmlubmVyVGV4dCA9IHRoaXMuc2NvcmU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2FtZUNvbXBvbmVudHMucm93cykuaW5uZXJUZXh0ID0gdGhpcy5yb3dzO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdhbWVDb21wb25lbnRzLmxldmVsKS5pbm5lclRleHQgPSB0aGlzLmxldmVsO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdhbWVDb21wb25lbnRzLnRpbWUpLmlubmVyVGV4dCA9IHRoaXMuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVucyB0aW1lIHN0cmluZ1xuICAgICAqL1xuICAgIGdldFRpbWUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLmZsb29yKHRoaXMubG9vcENvdW50IC8gdGhpcy5mcHMpICogMTAwMCkudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpO1xuICAgIH1cblxuICAgIGRyYXdUZXh0KHRleHQpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy50ZXRyaXNDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjdHguZm9udCA9IFwiMzBweCBhZXJpYWxcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzY2NjY2NlwiO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCA2MDApO1xuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgMTUwLCAyNTApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBzY29yZUJvYXJkXG4gICAgICogQHBhcmFtIHsqfSBlIFxuICAgICAqL1xuICAgIHVwZGF0ZVNjb3JlcyhlKSB7XG4gICAgICAgIGNvbnN0IGNsZWFyZWRSb3dzID0gZS5kZXRhaWwuY2xlYXJlZFJvd3M7XG5cbiAgICAgICAgdGhpcy5yb3dzICs9IGNsZWFyZWRSb3dzO1xuICAgICAgICB0aGlzLnNjb3JlICs9IE1hdGguZmxvb3IoNTAgKiBNYXRoLnBvdygxLjEsIGNsZWFyZWRSb3dzKSAqIGNsZWFyZWRSb3dzKTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IE1hdGguZmxvb3IodGhpcy5yb3dzIC8gMjApICsgMTtcblxuICAgICAgICBpZiAodGhpcy5sZXZlbCA+IDkpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSA5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RXZlbnRzKGUpIHtcbiAgICAgICAgbGV0IGV2ZW50O1xuXG4gICAgICAgIGlmICh0aGlzLnBhdXNlICYmIGUua2V5Q29kZSAhPT0ga2V5cy5QYXVzZVApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dVcDpcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93VXAnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93RG93bjpcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93RG93bicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dMZWZ0OlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dMZWZ0Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd1JpZ2h0OlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dSaWdodCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIGtleXMuU3BhY2U6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNTcGFjZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIGtleXMuUGF1c2VQOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzUGF1c2UnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBrZXlzLkhvbGRIOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzSG9sZCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubmV3IFRldHJpcygpOyJdfQ==

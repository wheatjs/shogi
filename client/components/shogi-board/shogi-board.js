(function() {

    /// <reference path="../shogi-pieces/shogi-knight.html" />

    class ShogiBoard extends Polymer.Element {

        static get is() { return 'shogi-board'; }
        static get config() {
            return {

                properties: {

                    turn: {
                        type: String,
                        value: 'black',
                        reflectToAttribute: true
                    }

                }

            };
        }

        constructor() {
            super();

            /**
             * Board Setup and Config
             */
            this.vboard = {
                
                // Board layout.
                layout: [
                    [16, 6, 12, 10, 2, 10, 12, 6, 16],
                    [0, 14, 0, 0, 0, 0, 0, 8, 0],
                    [4, 4, 4, 4, 4, 4, 4, 4, 4],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [3, 3, 3, 3, 3, 3, 3, 3, 3],
                    [0, 7, 0, 0, 0, 0, 0, 13, 0],
                    [15, 5, 11, 9, 1, 9, 11, 5, 15]
                ],

                // Board Charcater Map            
                charcater: {
                    1: { tag: 'shogi-jeweled-general', side: 'black' },
                    2: { tag: 'shogi-king-general', side: 'white' },
                    3: { tag: 'shogi-pawn', side: 'black', promotion: 30, capture: 4 },
                    4: { tag: 'shogi-pawn', side: 'white', promotion: 29, capture: 3 },
                    5: { tag: 'shogi-knight', side: 'black', promotion: 26, capture: 6 },
                    6: { tag: 'shogi-knight', side: 'white', promotion: 25, capture: 5 },
                    7: { tag: 'shogi-bishop', side: 'black', promotion: 20, capture: 8 },
                    8: { tag: 'shogi-bishop', side: 'white', promotion: 19, capture: 7 },
                    9: { tag: 'shogi-gold-general', side: 'black', promotion: 22, capture: 10 },
                    10: { tag: 'shogi-gold-general', side: 'white', promotion: 21, capture: 9 },
                    11: { tag: 'shogi-silver-general', side: 'black', promotion: 24, capture: 12 },
                    12: { tag: 'shogi-silver-general', side: 'white', promotion: 23, capture: 11 },
                    13: { tag: 'shogi-rook', side: 'black', promotion: 18, capture: 14 },
                    14: { tag: 'shogi-rook', side: 'white', promotion: 17, capture: 13 },
                    15: { tag: 'shogi-lance', side: 'black', promotion: 28, capture: 16 },
                    16: { tag: 'shogi-lance', side: 'white', promotion: 27, capture: 15 },

                    17: { tag: 'shogi-promoted-rook', side: 'white', capture: 13 },
                    18: { tag: 'shogi-promoted-rook', side: 'black', capture: 14 },
                    19: { tag: 'shogi-promoted-bishop', side: 'white', capture: 7 },
                    20: { tag: 'shogi-promoted-bishop', side: 'black', capture: 8 },
                    21: { tag: 'shogi-promoted-gold-general', side: 'white', capture: 9 },
                    22: { tag: 'shogi-promoted-gold-general', side: 'black', capture: 10 },
                    23: { tag: 'shogi-promoted-silver-general', side: 'white', capture: 11 },
                    24: { tag: 'shogi-promoted-silver-general', side: 'black', capture: 12 },
                    25: { tag: 'shogi-promoted-knight', side: 'white', capture: 5 },
                    26: { tag: 'shogi-promoted-knight', side: 'black', capture: 6 },
                    27: { tag: 'shogi-promoted-lance', side: 'white', capture: 15 },
                    28: { tag: 'shogi-promoted-lance', side: 'black', capture: 16 },
                    29: { tag: 'shogi-promoted-pawn', side: 'white', capture: 3 },
                    30: { tag: 'shogi-promoted-pawn', side: 'black', capture: 4 }
                },

                whitePieces: [2, 4, 6, 8, 10, 12, 14, 16, 17, 19, 21, 23, 25, 27, 29],
                blackPieces: [1, 3, 5, 7, 9, 11, 13, 15, 18, 20, 22, 24, 26, 28, 30],

                whitePromotion: [8, 7, 6],
                blackPromotion: [0, 1, 2],

                attributes: [
                    { y: 3, x: 3, attributes: ['marker-top-left', 'marker'] },
                    { y: 3, x: 6, attributes: ['marker-top-left', 'marker'] },
                    { y: 6, x: 3, attributes: ['marker-top-left', 'marker'] },
                    { y: 6, x: 6, attributes: ['marker-top-left', 'marker'] }
                ]

            };

            this.capturedWhitePieces = [];
            this.capturedBlackPieces = [];

            this.selectedPiece = null;
            this.selectedX = 0;
            this.selectedY = 0;
        }

        connectedCallback() {
            super.connectedCallback();

            this.board = this.$.board;
            this.leftKoma = this.$.leftKoma;
            this.rightKoma = this.$.rightKoma;

            this.placeSound = new Audio('/assets/audio/shogi-piece.mp3');
            this.drawBoard();
        }

        drawBoard() {
            for (let y = 0; y < this.vboard.layout.length; y++) {

                let row = BoardHelper.CreateElementWithAttributes('div', ['row', { y: y }]);
                this.board.appendChild(row);

                for (let x = 0; x < this.vboard.layout[y].length; x++) {
                    let col = BoardHelper.CreateElementWithAttributes('div', ['column', { y: y }, { x: x }]);
                    row.appendChild(col);
                }
            }

            let attributes = this.vboard.attributes;
            
            for (let i = 0; i < attributes.length; i++) 
                for (let z = 0; z < attributes[i].attributes.length; z++) 
                    BoardHelper.GetColumn(attributes[i].y, attributes[i].x, this.board).setAttribute(attributes[i].attributes[z], '');

            this.drawPieces();
        }

        /**
         * Draws the pieces onto the board.
         */
        drawPieces() {
            this.clearPiecesFromBoard();

            for (let y = 0; y < this.vboard.layout.length; y++) {
                for (let x = 0; x < this.vboard.layout[y].length; x++) {
                    if (this.vboard.layout[y][x] !== 0) {
                        let piece = this.vboard.charcater[this.vboard.layout[y][x]];
                        let physicalPiece = BoardHelper.CreateElementWithAttributes(piece.tag, [{ side: piece.side }, { x: x }, { y: y }]);

                        // Add Event Listener
                        if(this.turn === piece.side)
                            physicalPiece.addEventListener('tap', (e) => this.onPieceTapped(e), { passive: true, useCapture: false });

                        BoardHelper.GetColumn(y, x, this.board).appendChild(physicalPiece);
                    }
                }
            }

        }

        /**
         * Clears all pieces from the physical board.
         */
        clearPiecesFromBoard() {
            let nodes = this.board.querySelectorAll('[column]');

            for (let i = 0; i < nodes.length; i++) {
                while (nodes[i].hasChildNodes())
                    nodes[i].removeChild(nodes[i].lastChild);
            }
        }

        clearHighlightsFromBoard() {
            let nodes = this.board.querySelectorAll('[column]');

            for (let i = 0; i < nodes.length; i++) {
                nodes[i].removeAttribute('highlight');
            }
        }

        /**
         * Listenes for a piece to be tapped.
         * Displays all possible moves.
         */
        onPieceTapped(e) {
            this.clearHighlightsFromBoard();     
            let targetElement = e.target;

            // Remove the event listeners from all the columns.            
            let nodes = this.board.querySelectorAll('[target]')
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].parentNode.removeChild(nodes[i]);
            }

            // Local variables for ease.
            let currentX = parseInt(e.target.getAttribute('x'));
            let currentY = parseInt(e.target.getAttribute('y'));
            let piece = this.vboard.layout[currentY][currentX];

            // Get possible moves.
            let possibleMoves = targetElement.possibleMoves(currentY, currentX, this.vboard);
            
            for (let i = 0; i < possibleMoves.length; i++) {
                
                if (BoardHelper.GetColumn(possibleMoves[i].y, possibleMoves[i].x, this.board).querySelectorAll('[target]').length <= 0) {
                    let highlight = BoardHelper.CreateElementWithAttributes('div', ['target']);

                    highlight.addEventListener('tap', (e) => this.onSquareSelected(e, targetElement));

                    BoardHelper.GetColumn(possibleMoves[i].y, possibleMoves[i].x, this.board).appendChild(highlight);
                    BoardHelper.GetColumn(possibleMoves[i].y, possibleMoves[i].x, this.board).setAttribute('highlight', '');
                }
                
            }

        }

        onSquareSelected(e, currentPiece) {
            this.clearHighlightsFromBoard(); 

            let targetY = parseInt(e.target.parentNode.getAttribute('y'));
            let targetX = parseInt(e.target.parentNode.getAttribute('x'));

            let currentY = parseInt(currentPiece.getAttribute('y'));            
            let currentX = parseInt(currentPiece.getAttribute('x'));


            // Determine if should promote or if game is won.
                        
            let blackWin = false;
            let whiteWin = false;

            let piece = this.vboard.layout[currentY][currentX];
            let targetPiece = this.vboard.layout[targetY][targetX];

            if (BoardHelper.IsBlackPiece(piece, this.vboard)) {
                if (this.vboard.charcater[piece].hasOwnProperty('promotion') && this.vboard.blackPromotion.indexOf(targetY) > -1)
                    piece = this.vboard.charcater[piece].promotion;
                
                blackWin = targetPiece === 2;
            }
            
            if (BoardHelper.IsWhitePiece(piece, this.vboard)) {
                if (this.vboard.charcater[piece].hasOwnProperty('promotion') && this.vboard.whitePromotion.indexOf(targetY) > -1)
                    piece = this.vboard.charcater[piece].promotion;
                
                whiteWin = targetPiece === 1;
            }

            if (targetPiece !== 0) {
                console.log('piece captured');

                if (this.turn === 'black') {

                }
                    
                console.log(this.whiteCaptured);
                
                if (this.turn === 'white') {
                }
                    
                
                console.log(this.blackCaptured);
            }

            this.vboard.layout[targetY][targetX] = piece;
            this.vboard.layout[currentY][currentX] = 0;
            this.turn = (this.turn === 'black' ? 'white' : 'black');

            this.placeSound.play();
            this.drawPieces();

            if (blackWin) this.gameWon('Black');
            if (whiteWin) this.gameWon('White');
        }

        gameWon(side) {
            let winScreen = BoardHelper.CreateElementWithAttributes('div', ['overlay']);
            winScreen.className = 'animated flipInY';
            winScreen.innerText = side + ' Wins!';
            
            this.board.appendChild(winScreen);
        }
        
    }

    customElements.define(ShogiBoard.is, ShogiBoard);

})();

class BoardHelper {

        static CreateElementWithAttributes(name, attributes) {

            let el = document.createElement(name);

            for (let attr of attributes) {

                if (typeof attr === 'string') 
                    el.setAttribute(attr, '');
                else 
                    el.setAttribute(Object.keys(attr)[0], attr[Object.keys(attr)[0]]);
                
            }

            return el;
        }

        static GetColumn(y, x, board) {
            let row = board.querySelectorAll('[row]')[y];
            let column = row.querySelectorAll('[column]')[x];
            return column;
        }

        static IsBlackPiece(number, config) {
            for (let num of config.blackPieces) {
                if (number === num)
                    return true;    
            }

            return false;
        }

        static IsWhitePiece(number, config) {
            for (let num of config.whitePieces) {
                if (number === num)
                    return true;    
            }

            return false;
        }

    }
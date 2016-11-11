(function () {

    /// <reference path="../shogi-pieces/shogi-knight.html" />

    class ShogiBoard extends Polymer.Element {

        static get is() { return 'shogi-board'; }
        static get config() {
            return {
                properties: {
                    whiteCapturedCount: {
                        type: Number,
                        value: 0
                    },

                    blackCapturedCount: {
                        type: Number,
                        value: 0
                    }
                }
            }
        }
        
        constructor() {
            super();

            this.virtualBoard = BoardConfiguration;
            this.physicalBoard = PhysicalBoardConfiguration;

            this.blackCaptured = [];
            this.whiteCaptured = [];

            this.turn = 'black';
        }

        connectedCallback() {
            super.connectedCallback();

            this.placeSound = new Audio(this.physicalBoard.sounds.place);
            this.drawBoard();
        }

        /**
         * Draws the shogi board. 
         */
        drawBoard() {
            for (let row = 0; row < this.virtualBoard.board.length; row++) {
                let physicalRow = PhysicalBoard.createRow(row);

                for (let column = 0; column < this.virtualBoard.board[row].length; column++)
                    physicalRow.appendChild(PhysicalBoard.createColumn(column, row));

                this.$.board.appendChild(physicalRow);
            }

            this.drawPieces();
        }


        /**
         * Draws the pieces onto the board.
         */
        drawPieces() {
            this.clearBoardPieces();

            for (let row = 0; row < this.virtualBoard.board.length; row++) {
                for (let column = 0; column < this.virtualBoard.board[row].length; column++) {
                    if (this.virtualBoard.board[row][column] !== 0) {
                        let pieceLexicon =
                            BoardUtil.lexiconLookup(this.virtualBoard.board, this.virtualBoard.lexicon, row, column);

                        let physicalPiece =
                            PhysicalBoard.createElementWithAttributes(pieceLexicon.tag, [{ side: pieceLexicon.side }, { x: column }, { y: row }]);

                        if (this.turn === pieceLexicon.side)
                            physicalPiece.addEventListener('tap', (e) => this.onPieceTapped(e), { passive: true, useCapture: false });

                        PhysicalBoard.getColumn(row, column, this.$.board).appendChild(physicalPiece);
                    }
                }
            }
        }

        /**
         * Clears all pieces from the physical board.
         */
        clearBoardPieces() {
            let nodes = this.$.board.querySelectorAll('[column]');

            for (let i = 0; i < nodes.length; i++)
                while (nodes[i].hasChildNodes())
                    nodes[i].removeChild(nodes[i].lastChild);
        }

        /**
         * Clears all highlights from the board.
         */
        clearBoardHighlights() {
            let nodes = this.$.board.querySelectorAll('[column]');

            for (let i = 0; i < nodes.length; i++)
                nodes[i].removeAttribute('highlight');
        }

        /**
         * Clears all piece targets from the board.
         */
        clearBoardTargets() {
            let nodes = this.$.board.querySelectorAll('[target]');

            for (let i = 0; i < nodes.length; i++)
                nodes[i].parentNode.removeChild(nodes[i]);
        }

        /**
         * Listenes for a piece to be tapped.
         * Displays all possible moves.
         */
        onPieceTapped(e) {
            this.clearBoardHighlights();
            this.clearBoardTargets();

            let origin = e.target;
            let moves = origin.possibleMoves(parseInt(e.target.getAttribute('y')), parseInt(e.target.getAttribute('x')), this.virtualBoard.board, this.virtualBoard.lexicon);

            origin.parentNode.setAttribute('highlight', '');

            for (let i = 0; i < moves.length; i++) {
                if (PhysicalBoard.getColumn(moves[i].y, moves[i].x, this.$.board).querySelectorAll('[target]').length <= 0) {
                    let target = PhysicalBoard.createElementWithAttributes('div', ['target']);

                    target.addEventListener('tap', (event) => this.onSquareSelected(event, origin), { passive: true, useCapture: false });

                    PhysicalBoard.getColumn(moves[i].y, moves[i].x, this.$.board).appendChild(target);
                    PhysicalBoard.getColumn(moves[i].y, moves[i].x, this.$.board).setAttribute('highlight', '');
                }
            }
        }

        /**
         * Adds event listeners to the squars for user movement.
         */
        onSquareSelected(e, physicalPiece) {

            let target = { x: e.target.parentNode.getAttribute('x'), y: e.target.parentNode.getAttribute('y') };
            let current = { x: physicalPiece.getAttribute('x'), y: physicalPiece.getAttribute('y') };

            let currentPiece = BoardUtil.getBoardPiece(this.virtualBoard.board, current.y, current.x);
            let targetPiece = BoardUtil.getBoardPiece(this.virtualBoard.board, target.y, target.x);

            currentPiece = BoardUtil.promotePiece(currentPiece, this.virtualBoard.board, this.virtualBoard.lexicon, target.y);

            BoardUtil.setBoardPiece(currentPiece, this.virtualBoard.board, target.y, target.x);
            BoardUtil.setBoardPiece(0, this.virtualBoard.board, current.y, current.x);
            
            if (this.turn === 'black' && targetPiece !== 0 && targetPiece !== 2)
                this.blackCaptured.push(this.virtualBoard.lexicon[targetPiece].capture);
            
            if (this.turn === 'white' && targetPiece !== 0 && targetPiece !== 1) 
                this.whiteCaptured.push(this.virtualBoard.lexicon[targetPiece].capture);

            this.turn = this.turn === 'white' ? 'black' : 'white';

            this.placeSound.play();
            this.renderCaptured();
            this.clearBoardHighlights();
            this.clearBoardTargets();
            this.drawPieces();

        }

        clearCapturedContainers() {
            let nodes = this.$.blackBoard.querySelectorAll('[captured-column]');

            for (let i = 0; i < nodes.length; i++)
                nodes[i].parentNode.removeChild(nodes[i]);
            
            nodes = this.$.whiteBoard.querySelectorAll('[captured-column]');

            for (let i = 0; i < nodes.length; i++)
                nodes[i].parentNode.removeChild(nodes[i]);

        }

        renderCaptured() {
            this.clearCapturedContainers();

            this.blackCapturedCount = this.blackCaptured.length;
            this.whiteCapturedCount = this.whiteCaptured.length;

            for (let i = 0; i < this.blackCaptured.length; i++) {
                let piece = this.virtualBoard.lexicon[this.blackCaptured[i]];

                let physicalPiece =
                        PhysicalBoard.createElementWithAttributes(piece.tag, [{ side: piece.side }]);

                let column = PhysicalBoard.createElementWithAttributes('div', ['captured-column']);
                column.appendChild(physicalPiece);

                this.$.blackBoard.appendChild(column);
            }

            for (let i = 0; i < this.whiteCaptured.length; i++) {
                let piece = this.virtualBoard.lexicon[this.whiteCaptured[i]];

                let physicalPiece =
                        PhysicalBoard.createElementWithAttributes(piece.tag, [{ side: piece.side }]);

                let column = PhysicalBoard.createElementWithAttributes('div', ['captured-column']);
                column.appendChild(physicalPiece);

                this.$.whiteBoard.appendChild(column);
            }

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
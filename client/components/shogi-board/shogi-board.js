'use strict';

class ShogiBoard extends Polymer.Element {

    static get is() { return 'shogi-board'; }

    constructor() {
        super();

        this.board = {
            rows: 9,
            columns: 9,

            markers: [
                { row: 3, col: 3, attr: ['marker-top-left', 'marker'] },
                { row: 3, col: 5, attr: ['marker-top-right', 'marker'] },
                { row: 5, col: 3, attr: ['marker-bottom-left', 'marker'] },
                { row: 5, col: 5, attr: ['marker-bottom-right', 'marker'] }
            ],

            pieces: [
                { row: 0, col: 0, name: 'Lance', char: '香車' },
                { row: 0, col: 8, name: 'Lance', char: '香車' },
                { row: 0, col: 4, name: 'King', char: '王將' },
                { row: 0, col: 3, name: 'Gold General', char: '金將' },
                { row: 0, col: 5, name: 'Gold General', char: '金將' },
                { row: 0, col: 2, name: 'Silver General', char: '銀將' },
                { row: 0, col: 6, name: 'Silver General', char: '銀將' },
                { row: 0, col: 1, name: 'Knight', char: '桂馬' },
                { row: 0, col: 7, name: 'Knight', char: '桂馬' },
                { row: 1, col: 1, name: 'Rook', char: '飛車' },
                { row: 1, col: 7, name: 'Bishop', char: '角行' },
                { row: 2, col: 0, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 1, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 2, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 3, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 4, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 5, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 6, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 7, name: 'Pawn', char: '歩兵' },
                { row: 2, col: 8, name: 'Pawn', char: '歩兵' }

            ]
        }
    }

    connectedCallback() {
        super.connectedCallback();

        for (let y = 0; y < this.board.rows; y++) {
            let row = document.createElement('div');
            row.setAttribute('row', '');
            this.$.board.appendChild(row);

            for (let x = 0; x < this.board.columns; x++) {
                let column = document.createElement('div');
                column.setAttribute('column', '');
                row.appendChild(column);
            }

        }

        this._setMarkers();
        this._setPieces();
    }

    _setMarkers() {
        for (let marker of this.board.markers)
            for (let attr of marker.attr)
                this.getColumn(marker.row, marker.col).setAttribute(attr, '');
    }

    _setPieces() {
        for (let piece of this.board.pieces) {
            let shogiPiece = document.createElement('shogi-piece');
            shogiPiece.innerText = piece.char;

            this.getColumn(piece.row, piece.col).appendChild(shogiPiece);
        }
    }

    getRow(row) {
        return this.$.board.querySelectorAll('[row]')[row];
    }

    getColumn(row, column) {
        return this.getRow(row).querySelectorAll('[column]')[column];
    }
    
}

customElements.define(ShogiBoard.is, ShogiBoard);
'use strict';

class ShogiBoard extends Polymer.Element {

    static get is() { return 'shogi-board'; }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

    }

    // drawBoard() {
    //     let boardSize = Math.min(this.canvas.width, this.canvas.height);
    //     let boardOffset = (this.canvas.width - boardSize) / 2;

    //     // this.context.fillStyle = 'black';
    //     // this.context.fillRect(boardOffset, 0, boardSize, boardSize)

    //     var p = 0;
    //     var p1 = boardOffset;


    //     for (var x = 0; x <= boardSize; x += boardSize / 9) {
    //         this.context.moveTo(0 + x + p1, p);
    //         this.context.lineTo(0 + x + p1, boardSize + p1);
    //     }


    //     for (var x = 0; x <= boardSize; x += boardSize / 9) {
    //         this.context.moveTo(p1, 0 + x + p);
    //         this.context.lineTo(boardSize + p1, 0 + x + p);
    //     }

    //     this.context.strokeStyle = "black";
    //     this.context.stroke();
    // }
    
}

customElements.define(ShogiBoard.is, ShogiBoard);
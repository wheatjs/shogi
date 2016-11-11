class BoardUtil {

    static lexiconLookup(board, lexicon, row, column) {
        return lexicon[board[row][column]];
    }

    static lexiconPieceLookup(piece, lexicon) {
        return lexicon[piece];
    }

    /**
     * Returns the side the piece belongs to.
     */
    static side(piece, lexicon) {
        return lexicon[piece].side;
    }

    /**
     * Determines if the piece is a black piece.
     */
    static isBlackPiece(piece, lexicon) {
        if (piece === 0) return false;
        return BoardUtil.side(piece, lexicon) === 'black';
    }

    /**
     * Determins if the piece is a white piece.
     */
    static isWhitePiece(piece, lexicon) {
        if (piece === 0) return false;
        return BoardUtil.side(piece, lexicon) === 'white';
    }

    /**
     * Filters out any invalid moves.
     *
     * Invalid moves consist of moves that have a negative value, meaning they
     * are off the board or moves that have the same value as the origin.
     */    
    static filterInvalidMoves(moves, origin) {
        let filtered = [];

        for (let i = 0; i < moves.length; i++) 
            if (moves[i].x >= 0 && moves[i].y >= 0 && moves[i].x < 9 && moves[i].y < 9) 
                if (moves[i].x !== origin.x || moves[i].y !== origin.y)
                    filtered.push(moves[i]);

        return filtered;
    }

    static getBoardPiece(board, y, x) {
        return board[y][x];
    }

    /**
     * Set a piece of the board.
     */
    static setBoardPiece(piece, board, y, x) {
        board[y][x] = piece;
    }

    static promotePiece(piece, board, lexicon, y) {
        if (BoardUtil.isBlackPiece(piece, lexicon) && y <= 2 && BoardUtil.lexiconPieceLookup(piece, lexicon).hasOwnProperty('promote'))
            return BoardUtil.lexiconPieceLookup(piece, lexicon).promote;
        
        if (BoardUtil.isWhitePiece(piece, lexicon) && y >= 6 && BoardUtil.lexiconPieceLookup(piece, lexicon).hasOwnProperty('promote'))
            return BoardUtil.lexiconPieceLookup(piece, lexicon).promote;
        
        return piece;
    }

}
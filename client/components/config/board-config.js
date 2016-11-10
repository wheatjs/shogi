BoardConfiguration = {

    board: [
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

    lexicon: {
        1: { tag: 'shogi-jeweled-general', side: 'black' },
        3: { tag: 'shogi-pawn', side: 'black', promote: 29, capture: 4 },
        5: { tag: 'shogi-knight', side: 'black', promote: 25, capture: 6 },
        7: { tag: 'shogi-bishop', side: 'black', promote: 19, capture: 8 },
        9: { tag: 'shogi-gold-general', side: 'black', capture: 10 },
        11: { tag: 'shogi-silver-general', side: 'black', promote: 23, capture: 12 },
        13: { tag: 'shogi-rook', side: 'black', promote: 17, capture: 14 },
        15: { tag: 'shogi-lance', side: 'black', promote: 27, capture: 16 },

        2: { tag: 'shogi-king-general', side: 'white' },
        4: { tag: 'shogi-pawn', side: 'white', promote: 30, capture: 3 },
        6: { tag: 'shogi-knight', side: 'white', promote: 26, capture: 5 },
        8: { tag: 'shogi-bishop', side: 'white', promote: 20, capture: 7 },
        10: { tag: 'shogi-gold-general', side: 'white', promote: 22, capture: 9 },
        12: { tag: 'shogi-silver-general', side: 'white', promote: 24, capture: 11 },
        14: { tag: 'shogi-rook', side: 'white', promote: 18, capture: 13 },
        16: { tag: 'shogi-lance', side: 'white', promote: 28, capture: 15 },

        17: { tag: 'shogi-promoted-rook', side: 'black', capture: 14 },
        19: { tag: 'shogi-promoted-bishop', side: 'black', capture: 8 },
        21: { tag: 'shogi-promoted-gold-general', side: 'black', capture: 10 },
        23: { tag: 'shogi-promoted-silver-general', side: 'black', capture: 12 },
        25: { tag: 'shogi-promoted-knight', side: 'black', capture: 6 },
        27: { tag: 'shogi-promoted-lance', side: 'black', capture: 16 },
        29: { tag: 'shogi-promoted-pawn', side: 'black', capture: 4 },

        18: { tag: 'shogi-promoted-rook', side: 'white', capture: 13 },
        20: { tag: 'shogi-promoted-bishop', side: 'white', capture: 7 },
        22: { tag: 'shogi-promoted-gold-general', side: 'white', capture: 9 },
        24: { tag: 'shogi-promoted-silver-general', side: 'white', capture: 11 },
        26: { tag: 'shogi-promoted-knight', side: 'white', capture: 5 },
        28: { tag: 'shogi-promoted-lance', side: 'white', capture: 15 },
        30: { tag: 'shogi-promoted-pawn', side: 'white', capture: 3 }
    }

};

PhysicalBoardConfiguration = {

    attributes: [
        { y: 3, x: 3, attributes: ['marker-top-left', 'marker'] },
        { y: 3, x: 6, attributes: ['marker-top-left', 'marker'] },
        { y: 6, x: 3, attributes: ['marker-top-left', 'marker'] },
        { y: 6, x: 6, attributes: ['marker-top-left', 'marker'] }
    ],

    sounds: {
        place: '/assets/audio/shogi-piece.mp3'
    }

};
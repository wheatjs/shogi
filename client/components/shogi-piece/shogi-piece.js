class ShogiPiece extends Polymer.LegacyElement {

    static get is() { return 'shogi-piece'; }
    
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }


}

customElements.define(ShogiPiece.is, ShogiPiece);
class ShogiMenu extends Polymer.Element {

    static get is() { return 'shogi-menu'; }

    static get config() {
        return {
            properties: {
                active: {
                    type: Boolean,
                    reflectToAttribute: true,
                    value: false
                }
            },

            observers: [
                'activateStateChanged(active)'
            ]
        }
    }

    constructor() {
        super();
        this.connected = false;
        this.audio = new Audio('../assets/audio/menu.mp3');
        this.audio.volume = .5;
    }

    connectedCallback() {
        super.connectedCallback();
        this.connected = true;
    }

    activateStateChanged(selected) {
        if (this.connected) {
            let iterator = 1;
        
            for (let a of this.shadowRoot.querySelectorAll('a')) {
                a.addEventListener('mouseover', () => this.menuover());
                a.addEventListener('focus', () => this.menuover());

                window.setTimeout(() => { a.removeAttribute('inactive'); }, 100 * iterator);
                iterator++;
            }
        }
    }

    menuover() {
        this.audio.currentTime = 0;
        this.audio.play();
    }

}

customElements.define(ShogiMenu.is, ShogiMenu);
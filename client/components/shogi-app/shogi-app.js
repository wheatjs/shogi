'use strict';

class ShogiApp extends Polymer.Element {

    static get is() { return 'shogi-app'; }

    static get config() {
        return {
            properties: {
                page: {
                    type: String,
                    reflectToAttribute: true,
                    value: 'test'
                }
            },

            observers: [
                'pageChagned(page)',
                'routeChanged(routeData.page)'
            ]
        }
    }

    pageChagned(page) {
        this.page = page || 'menu';
    }

    routeChanged(route) {
        this.page = route || 'menu';
    }

}

customElements.define(ShogiApp.is, ShogiApp);
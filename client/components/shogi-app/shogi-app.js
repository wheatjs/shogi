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
                'routeChanged(routeData.page)'
            ]
        }
    }

    routeChanged(route) {
        this.page = this.route.path || '/';
    }

}

customElements.define(ShogiApp.is, ShogiApp);
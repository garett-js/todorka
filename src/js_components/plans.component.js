import { Component } from "../js_core/component";

export class PlansComponent extends Component {
    constructor(id) {
        super(id)
        this.init()
    }

    static create(el) {
        return new PlansComponent(el)
    }

    init() {
    }
}
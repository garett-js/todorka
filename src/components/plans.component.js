import { Component } from "../core/component";

export class PlansComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new PlansComponent(el)
    }

    init() {
    }
}
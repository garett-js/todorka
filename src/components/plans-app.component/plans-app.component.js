import { Component } from '../../core/component'
import { LoaderComponent }from '../loader.component'

export default class PlansComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new PlansComponent(el)
    }

    init() {
    }
}



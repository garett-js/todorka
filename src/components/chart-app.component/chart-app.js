import { Component } from '../../core/component'
import { LoaderComponent }from '../loader.component'

export default class ChartAppComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new ChartAppComponent(el)
    }

    init() {
    }
}



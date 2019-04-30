import { Component } from '../../core/component'
import { LoaderComponent }from '../loader.component'

export default class BugsAppComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new BugsAppComponent(el)
    }

    init() {
    }
}



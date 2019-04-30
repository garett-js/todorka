import { Component } from '../../core/component'
import { LoaderComponent }from '../loader.component'

export default class ConfigAppComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new ConfigAppComponent(el)
    }

    init() {
    }
}



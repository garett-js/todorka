import { Component } from '../../core/component'
import { LoaderComponent }from '../loader.component'

export default class BlogAppComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new BlogAppComponent(el)
    }

    init() {
    }
}



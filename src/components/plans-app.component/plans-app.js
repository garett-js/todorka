import { Component } from '../../core/component'
import { LoaderComponent }from '../loader.component'
import { plansController } from '../../mvc/controllers/plans.controller'

import PlansListComponent from '../plans-list.component'
import PlansShowComponent from '../plans-show.component'


export default class PlansComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new PlansComponent(el)
    }

    init() {
        const loader = new LoaderComponent('loader')          
        const plansShowComponent = new PlansShowComponent('plan-show')
        const plansListComponent = new PlansListComponent('list-plans', plansShowComponent, { loader })

        plansListComponent.show()

        this.list = plansListComponent
    }

    onShow() {
        super.onShow()
        this.list.show()
    }
}



import { Component } from '../../core/component'
import { LoaderComponent }from '../loader.component'
import { plansController } from '../../mvc/controllers/plans.controller'

import PlansListComponent from '../plans-list.component'


export default class PlansComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new PlansComponent(el)
    }

    init() {

        console.log(PlansListComponent)
        
        const loader = new LoaderComponent('loader')
              
        const plansListComponent = new PlansListComponent('list-plans', { loader })     

        plansListComponent.show()
    }
}



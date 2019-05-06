import { Component } from '../../core/component'
import { plansController } from '../../mvc/controllers/plans.controller'

export default class PlansListComponent extends Component {
    constructor(id, { loader }) {
        super(id)    
        this.count = 0
        this.loader = loader
    }

    init() { 
        this.startEventListining()   
    }

    async onShow() {   
        await this.RenderList()
    }

    startEventListining() {
    }

    async RenderList() {      
        this.loader.show() 

        const html = await plansController.index()

        this.$el.insertAdjacentHTML('beforeend', html.join(' '))

        this.loader.hide()
    }
}
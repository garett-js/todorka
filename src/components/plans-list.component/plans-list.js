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
        const plan = await plansController.show('0')

        this.$plan = this.$el.querySelector('.plan-show')

        this.$plan.classList.remove('js-hide')
        this.$plan.innerHTML = ''
        this.$plan.insertAdjacentHTML('afterbegin', plan)
        
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
import { Component } from '../../core/component'
import { plansController } from '../../mvc/controllers/plans.controller'

export default class PlansListComponent extends Component {
    constructor(id, cpt, { loader }) {
        super(id)    
        this.count = 0
        this.loader = loader
        this.cpt = cpt
    }

    init() { 
        this.startEventListining()   
    }

    async onShow() {
        await this.RenderList() 
    }

    startEventListining() {
        this.$el.addEventListener('click', clickPlanCardHandler.bind(this))
    }

    async RenderList() {
        this.$el.innerHTML = '' 
        const html = await plansController.index()        
        this.$el.insertAdjacentHTML('beforeend', html.join(' '))
        document.querySelector('.app-menu__count-indicator-for-plans').innerHTML = html.length
    }
}

async function clickPlanCardHandler(event) {
    if ( event.target.classList.contains('js-plan-card') ) {
        event.preventDefault()
        const target = event.target.closest('div')
        const plan = await plansController.show(`${target.dataset.key}`) 

        this.cpt.show()
        
        this.cpt.$el.innerHTML = ''
        this.cpt.$el.insertAdjacentHTML('afterbegin', plan)
    }
}
import { Component } from '../../core/component'
import { pomidorkaController } from '../../mvc/controllers/pomidorka.controller'
import { enabledElement, disabledElement } from  '../../libs/help-functions'

export default class PlansShowComponent extends Component {
    constructor(id) {
        super(id)    
    }

    init() {
        this.startEventListining()
    }

    onShow() { }

    startEventListining() {
        this.$el.addEventListener('click', (event) => {
            if (event.target.classList.contains('js-btn-close')) {
                this.hide()
            }
        })

        this.$el.addEventListener('click', planToPomidorkosHandler.bind(this))
    }
}
// private
async function planToPomidorkosHandler(event) {
    if (event.target.classList.contains('js-btn-add-pomidorka')) {
        const target = event.target.closest('tr')

        const planTitle = target.querySelector('.title_plan').innerHTML
        const planId = target.dataset.key

        const data = {
            planId: planId,
            pomidorkatitle: planTitle
        } 
            
        await pomidorkaController.create(data)

        event.target.classList.add('red-button')
    }
}
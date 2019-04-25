import { Component } from '../../core/component'
import { pomidorkaController } from '../../mvc/controllers/pomidorka.controller'

export default class PomidorkaListComponent extends Component {
    constructor(id, { loader }) {
        super(id)    
        this.count = 0
        this.loader = loader
    }

    init() {
        this.$table = document.querySelector('.pomidorka-table')   
        this.startEventListining()   
    }

    async onShow() {   
        this.loader.show() 
        await this.RenderList()
        this.loader.hide()
    }
    startEventListining() {
        this.$el.addEventListener('click', deleteItemHandler.bind(this))
    }

    async RenderList() {      
        this.$table.innerHTML = ''
        const html = await pomidorkaController.index()
        this.$table.insertAdjacentHTML('afterbegin', html.join(' '))
    }
}

async function deleteItemHandler(event) {
    if (event.target.classList.contains('js-list-item-del')) {
        event.preventDefault()
        const target = event.target.closest('tr')
        await pomidorkaController.delete(`${target.dataset.key}`)
        this.loader.show() 
        await this.RenderList()
        this.loader.hide()
    }
}
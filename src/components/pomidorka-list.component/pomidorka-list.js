import { Component } from '../../core/component'
import { pomidorkaController } from '../../mvc/controllers/pomidorka.controller'

export default class PomidorkaListComponent extends Component {
    constructor(id) {
        super(id)    
    }

    init() {
        this.$table = document.querySelector('.pomidorka-table')      
    }

    onShow() {    
        this.RenderList()
    }
    startEventListining() {}

    async RenderList() {
        this.$table.innerHTML = ''
        const html = await pomidorkaController.index()
        this.$table.insertAdjacentHTML('afterbegin', html.join(' '))
    }
}
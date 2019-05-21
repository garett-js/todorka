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
        await this.RenderList()
    }

    startEventListining() {
        this.$el.addEventListener('click', deleteItemHandler.bind(this))
        this.$el.addEventListener('click', editItemHandler.bind(this))
        document.querySelector('.pomidorka-list__edit-close').addEventListener('click', () => {
            document.querySelector('.pomidorka-list__edit').classList.add('js-hide')
        })
    }

    async RenderList() {
        this.loader.show()
        this.$el.querySelector('.pomidorka-table').classList.add('opac')

        const html = await pomidorkaController.index()
        this.$table.innerHTML = ''
        this.$table.insertAdjacentHTML('afterbegin', html.join(' '))

        this.$el.querySelector('.pomidorka-table').classList.remove('opac')
        this.loader.hide()

        document.querySelector('.app-menu__count-indicator-for-pomidorkos').innerHTML = html.length
    }
}

async function deleteItemHandler(event) {
    if (event.target.classList.contains('js-list-item-del')) {
        event.preventDefault()
        const target = event.target.closest('tr')
        await pomidorkaController.delete(`${target.dataset.key}`)
        await this.RenderList()
    }
}

function editItemHandler(event) {
    if (event.target.classList.contains('js-list-item-edit')) {
        document.querySelector('.pomidorka-list__edit').classList.remove('js-hide')

        const target = event.target.closest('tr')
        const editForm = document.getElementById('pomidorka-edit-form')
        editForm.elements["key"].value = `${target.dataset.key}`
        editForm.elements["editpomidorkatitle"].value = `${target.firstElementChild.innerHTML}`
    }
}
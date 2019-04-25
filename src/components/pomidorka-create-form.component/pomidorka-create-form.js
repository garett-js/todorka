import { Component } from '../../core/component'
import { Validators } from '../../core/validators'
import { Form } from '../../core/form'
import { pomidorkaController } from '../../mvc/controllers/pomidorka.controller'

export default class PomidorkaCreateFormComponent extends Component {
    constructor(id, data = {}) {
        super(id)    
        this.data = data
    }

    init() {
        this.formCreate = Form.Create(this.$el, {
            pomidorkatitle: [Validators.required],
            count: [Validators.required]
        })
    }

    onShow() {
        this.startEventListining()
    }

    startEventListining() {
        this.$el.addEventListener('submit', createFormHandler.bind(this))
    }
}
// private
async function createFormHandler(event) {
    event.preventDefault()
    if (this.formCreate.isValid()) {
        const formData = {
            ...this.formCreate.value()
        }      
        await pomidorkaController.create(formData)
        this.data.show()
    }
}


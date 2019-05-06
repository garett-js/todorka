import { Component } from '../../core/component'
import { Validators } from '../../core/validators'
import { Form } from '../../core/form'
import { pomidorkaController } from '../../mvc/controllers/pomidorka.controller'
import { enabledElement, disabledElement } from  '../../libs/help-functions'


export default class PomidorkaEditFormComponent extends Component {
    constructor(id, data = {}) {
        super(id)    
        this.data = data
    }

    init() {

        console.log('PomidorkaEditFormComponent :: Create')
        
        this.formEdit = Form.Create(this.$el, {
            editpomidorkatitle: [Validators.required, Validators.maxLength(127)],
            key: [Validators.required]
        })

        this.startEventListining()
    }

    onShow() { }

    startEventListining() {
        this.$el.addEventListener('submit', editFormHandler.bind(this))
    }
}
// private
async function editFormHandler(event) {
    event.preventDefault()
    if (this.formEdit.isValid()) {
        const formData = {
            ...this.formEdit.value()
        }              
        
        await pomidorkaController.update({
            pomidorkatitle: formData.editpomidorkatitle
        }, formData.key)

        this.$el.classList.add('js-hide')
        this.data.show()
    }
}

